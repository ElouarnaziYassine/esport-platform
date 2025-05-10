import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8080';


const defaultImage = require('../assets/images/icon.jpg');

export default function TournamentContent() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formatFilter, setFormatFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [gameFilter, setGameFilter] = useState('ALL');

    const fetchTournaments = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/tournaments`);
            setTournaments(response.data);
        } catch (err) {
            console.error('Error fetching tournaments:', err);

            if (err.response) {
                setError(err.response.data.message || 'Server responded with an error.');
            } else if (err.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError('Unexpected error occurred.');
            }
        }
        finally {
            setLoading(false);
        }
    };

    const handleJoinTournament = (tournamentId) => {
        Alert.alert('Join Tournament', `You're joining tournament ${tournamentId}`);
    };


    useEffect(() => {
        fetchTournaments();
    }, []);


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Get tournament status display text and determine if it's upcoming, ongoing, or completed
    const getTournamentStatus = (tournament) => {
        // You can customize this logic based on your status values from the backend
        return tournament.status || 'Upcoming';
    };

    // Render loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ff88" />
                <Text style={styles.loadingText}>Loading tournaments...</Text>
            </View>
        );
    }

    // Render error state
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable style={styles.retryButton} onPress={fetchTournaments}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.filter}>
                <Pressable style={styles.selectButton}>
                    <Text style={styles.selectText}>FORMAT</Text>
                    <Text style={styles.selectIcon}>↓</Text>
                </Pressable>

                <Pressable style={styles.selectButton}>
                    <Text style={styles.selectText}>STATUS</Text>
                    <Text style={styles.selectIcon}>↓</Text>
                </Pressable>

                <Pressable style={styles.selectButton}>
                    <Text style={styles.selectText}>GAME</Text>
                    <Text style={styles.selectIcon}>↓</Text>
                </Pressable>
            </View>

            
                <View style={styles.cardsContainer}>
                    {tournaments.length === 0 ? (
                        <Text style={styles.noTournamentsText}>No tournaments available</Text>
                    ) : (
                        tournaments.map((tournament) => (
                            <View style={styles.card} key={tournament.id}>
                                <View style={styles.first}>
                                    <Image
                                        style={styles.image}
                                        source={tournament.logo ? { uri: tournament.logo } : defaultImage}
                                    />
                                    <Text style={styles.firstText}>
                                        {getTournamentStatus(tournament)}
                                    </Text>
                                </View>
                                <View style={styles.second}>
                                    <Text style={styles.cardTitle}>
                                        {tournament.name?.toUpperCase() || 'UNTITLED TOURNAMENT'}
                                    </Text>
                                    <Text style={styles.date}>
                                        {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                                    </Text>

                                    <Pressable
                                        style={styles.cardButton}
                                        onPress={() => handleJoinTournament(tournament.id)}
                                    >
                                        <View style={styles.buttonCard}>
                                            <Text style={{color:'white', fontWeight: 'bold',}}>
                                                JOIN
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    )}
                </View>
         
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        padding: 15,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
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
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    noTournamentsText: {
        color: 'white',
        textAlign: 'center',
        width: '100%',
        marginTop: 50,
        fontSize: 16,
    },
    card: {
        backgroundColor: 'rgba(9,28,63,0.9)',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        width: '48%',
        borderRadius: 5,
        borderRightColor: 'rgb(4,217,4)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(4,217,4)',
        borderRightWidth: 2,
        marginBottom: 20
    },
    image: {
        height: 65,
        width: 65,
        borderRadius: 7,
    },
    second: {
        flex: 1,
        marginLeft: 10
    },
    firstText: {
        color: 'white',
        marginTop: 8,
        backgroundColor: 'rgb(39,208,39)',
        fontSize: 13,
        fontWeight: 'bold',
        borderRadius: 3,
        alignItems: 'center',
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
    },
    cardTitle: {
        color: 'white',
        fontWeight: 'bold',
        flexShrink: 1,
        flexWrap: 'wrap',
        paddingTop: 5,
        fontSize: 12
    },
    date: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 8.5,
        padding: 5
    },
    cardButton: {
        marginTop: 20
    },
    buttonCard: {
        backgroundColor: 'rgb(1,34,104)',
        alignItems: 'center',
        borderRadius: 5,
        padding: 2
    },
    filter: {
        marginTop: 20,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    selectButton: {
        backgroundColor: 'rgba(9,28,63,0.9)',
        borderBottomColor: 'rgb(4,217,4)',
        borderBottomWidth: 2,
        borderRightColor: 'rgb(4,217,4)',
        borderRightWidth: 2,
        borderRadius: 5,
        width: '32%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    selectText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    selectIcon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});