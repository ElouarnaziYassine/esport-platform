from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import logging
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import SelectFromModel
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables
model = None
selected_features = None
team_data = None
available_teams = None

def load_data_and_train():
    global model, selected_features, team_data, available_teams
    
    # Check if model file exists
    if os.path.exists('lol_model.pkl'):
        logger.info("Loading existing model from file...")
        with open('lol_model.pkl', 'rb') as f:
            saved_data = pickle.load(f)
            model = saved_data['model']
            selected_features = saved_data['selected_features']
            team_data = saved_data['team_data']
            available_teams = saved_data['available_teams']
        logger.info(f"Model loaded. {len(available_teams)} teams available for prediction.")
        return

    logger.info("Training new model...")
    
    # Load data
    df = pd.read_csv('lool_matches.csv')
    
    # Filter to only include team-level data
    team_data = df[df['position'] == 'team'].copy()
    
    # Define initial features
    initial_features = [
        'teamkills', 'teamdeaths', 'team kpm', 'ckpm', 'damagetochampions',
        'dpm', 'totalgold', 'earnedgold', 'earned gpm', 'goldspent', 'visionscore'
    ]
    
    # Build matchup dataset
    matchup_data = []
    for game_id in team_data['gameid'].unique():
        game_teams = team_data[team_data['gameid'] == game_id]
        if len(game_teams) == 2:
            team1 = game_teams.iloc[0]
            team2 = game_teams.iloc[1]
            feature_diffs = {}
            for feature in initial_features:
                feature_diffs[feature] = team1[feature] - team2[feature]
            feature_diffs['result'] = team1['result']
            matchup_data.append(feature_diffs)
    
    matchup_df = pd.DataFrame(matchup_data)
    matchup_df.dropna(inplace=True)
    
    # Split features and target
    X = matchup_df[initial_features]
    y = matchup_df['result']
    
    # Feature selection
    selector = SelectFromModel(RandomForestClassifier(n_estimators=100, random_state=42))
    selector.fit(X, y)
    selected_features = X.columns[selector.get_support()].tolist()
    logger.info(f"Selected Features: {selected_features}")
    
    X_selected = X[selected_features]
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X_selected, y, test_size=0.3, random_state=42)
    
    # Model pipeline
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])
    pipeline.fit(X_train, y_train)
    
    # Save the model and related data
    model = pipeline
    available_teams = sorted(team_data['teamname'].unique())
    
    # Save to file for future use
    with open('lol_model.pkl', 'wb') as f:
        pickle.dump({
            'model': model,
            'selected_features': selected_features,
            'team_data': team_data,
            'available_teams': available_teams
        }, f)
    
    logger.info(f"Model trained and saved. {len(available_teams)} teams available for prediction.")

# Get average stats for a team
def get_team_stats(team_name):
    team_matches = team_data[team_data['teamname'] == team_name]
    if len(team_matches) == 0:
        return None
    return team_matches[selected_features].mean().to_frame().T

# Predict win probability (one-way)
def predict_win_probability(team1_name, team2_name):
    team1_stats = get_team_stats(team1_name)
    team2_stats = get_team_stats(team2_name)

    if team1_stats is None or team2_stats is None:
        return None

    diff_features = team1_stats.values - team2_stats.values
    diff_df = pd.DataFrame(diff_features, columns=selected_features)

    if diff_df.isnull().values.any():
        logger.warning("NaNs found in feature differences.")
        return None

    return model.predict_proba(diff_df)[0][1]

# Predict match outcome using average probability from both directions
def predict_match(team1_name, team2_name):
    try:
        team1_stats = get_team_stats(team1_name)
        team2_stats = get_team_stats(team2_name)

        if team1_stats is None:
            return {
                'error': f"Team '{team1_name}' not found in the dataset",
                'status': 'failed'
            }
        if team2_stats is None:
            return {
                'error': f"Team '{team2_name}' not found in the dataset",
                'status': 'failed'
            }

        p1 = predict_win_probability(team1_name, team2_name)
        p2 = predict_win_probability(team2_name, team1_name)

        if p1 is None or p2 is None:
            return {
                'error': "Prediction failed due to missing or invalid team data.",
                'status': 'failed'
            }

        team1_win_prob = (p1 + (1 - p2)) / 2
        team2_win_prob = 1 - team1_win_prob

        favorite = team1_name if team1_win_prob > team2_win_prob else team2_name
        win_prob = max(team1_win_prob, team2_win_prob)

        return {
            'team1': team1_name,
            'team2': team2_name,
            'team1_win_probability': float(team1_win_prob),
            'team2_win_probability': float(team2_win_prob),
            'predicted_winner': favorite,
            'win_probability': float(win_prob),
            'status': 'success'
        }
    except Exception as e:
        logger.error(f"Error in prediction: {str(e)}")
        return {
            'error': str(e),
            'status': 'failed'
        }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    team1 = data.get('team1')
    team2 = data.get('team2')

    if not team1 or not team2:
        return jsonify({'error': 'Both team1 and team2 are required', 'status': 'failed'}), 400

    result = predict_match(team1, team2)
    logger.info(f"Prediction: {team1} vs {team2}")
    return jsonify(result)

@app.route('/teams', methods=['GET'])
def get_teams():
    return jsonify({
        'teams': available_teams,
        'status': 'success'
    })

@app.route('/team-stats/<team_name>', methods=['GET'])
def team_statistics(team_name):
    team_matches = team_data[team_data['teamname'] == team_name]
    
    if len(team_matches) == 0:
        return jsonify({'error': f"Team '{team_name}' not found", 'status': 'failed'}), 404
    
    stats = team_matches[selected_features].mean().to_dict()
    wins = team_matches['result'].sum()
    losses = len(team_matches) - wins
    win_rate = wins / len(team_matches) if len(team_matches) > 0 else 0
    
    return jsonify({
        'team': team_name,
        'matches_played': int(len(team_matches)),
        'wins': int(wins),
        'losses': int(losses),
        'win_rate': float(win_rate),
        'avg_stats': stats,
        'status': 'success'
    })

if __name__ == '__main__':
    # Load model before starting the server
    load_data_and_train()
    app.run(port=5000, debug=True)