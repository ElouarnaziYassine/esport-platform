import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import Layout from './Layout';
import WatchCard from './WatchCard';

const bg = require('../assets/images/Watch.jpg');
const tournamentId = 5;

export default function Watch() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/matches/bracket/${tournamentId}`)
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches');
        setLoading(false);
      });
  }, []);

  return (
    <ImageBackground source={bg} style={styles.bg}>
      <Layout title="LIVE MATCHES" text="Ready to enter the arena?">
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>VALORANT ↓</Text>
        </View>

        {loading && <ActivityIndicator size="large" color="rgb(4,217,4)" />}
        {error && <Text style={styles.error}>{error}</Text>}

        <ScrollView contentContainerStyle={styles.cards}>
          {matches.map((match) => (
            <WatchCard
              key={match.matchId}
              time={new Date(match.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              teamA={match.teamA}
              teamB={match.teamB}
              scoreA={match.scoreA ?? 0}
              scoreB={match.scoreB ?? 0}
              status={match.status}
            />
          ))}
        </ScrollView>
      </Layout>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
  dropdownContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 16,
    backgroundColor: '#0e1033',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgb(4,217,4)',
  },
  dropdownText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  cards: {
    padding: 16,
    gap: 12,
  },
});