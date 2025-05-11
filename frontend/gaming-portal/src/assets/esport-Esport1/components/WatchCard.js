import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import usaFlag from '../assets/images/usa.png'; 

export default function WatchCard({ time, teamA, teamB, scoreA, scoreB, status }) {
  const getStatusColor = () => {
    switch (status) {
      case 'LIVE': return '#ff1a1a'; 
      case 'UPCOMING': return '#00cc66';
      default: return '#666';
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.time}>{time}</Text>

      <View style={styles.teamContainer}>
        <View style={styles.teamRow}>
          <Image source={usaFlag} style={styles.flag} />
          <Text style={styles.team}>{teamA}</Text>
          <Text style={styles.score}>{scoreA}</Text>
        </View>

        <View style={styles.teamRow}>
          <Image source={usaFlag} style={styles.flag} />
          <Text style={styles.team}>{teamB}</Text>
          <Text style={styles.score}>{scoreB}</Text>
        </View>
      </View>

      <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0a0a23',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e1f4b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
    width: 60,
  },
  teamContainer: {
    flex: 1,
    marginHorizontal: 12,
    gap: 8,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flag: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
  },
  team: {
    color: '#fff',
    flex: 1,
  },
  score: {
    color: '#fff',
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
