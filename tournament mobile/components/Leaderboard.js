import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Layout from './Layout';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8080';
const defaultLogo = require('../assets/images/icon.jpg');

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teams/leaderboard`);
      const sortedTeams = response.data.sort((a, b) => b.rating - a.rating);
      setTeams(sortedTeams);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Layout title="LEADERBOARD" text="THE BEST IN THE GAME">
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>FILTER BY GAME ↓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>FILTER BY TOURNAMENT ↓</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff88" />
          <Text style={styles.loadingText}>Loading teams...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchTeams} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.list}>
          {teams.map((team, index) => (
            <View style={styles.card} key={team.id}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Image
                source={team.logo ? { uri: team.logo } : defaultLogo}
                style={styles.logo}
              />
              <Text style={styles.name}>{team.name}</Text>
              <Text style={styles.score}>{team.rating}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 16,
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#0e1033',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgb(4,217,4)',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a23',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rank: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  name: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    color: 'rgb(4,217,4)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00ff88',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
