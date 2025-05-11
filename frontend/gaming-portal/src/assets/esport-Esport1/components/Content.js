import React from "react";
import {Text, View, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Footer from "./Footer";

// GameCard Component
const GameCard = ({ title, categories, imageSource, onPress }) => {
    return (
        <Pressable style={styles.cardContainer} onPress={onPress}>
            <Image source={imageSource} style={styles.backgroundImage} />

            {/* Gradient overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            />

            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>{title}</Text>

                <View style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <View key={index} style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{category}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Pressable>
    );
};

export default function Content(){
    // Sample game data
    const games = [
        {
            id: 1,
            title: 'LEAGUE OF LEGENDS',
            categories: ['Epic 5v5 MOBA', 'BATTLES'],
            imageSource: require('../assets/images/league.jpg'),
            onPress: () => console.log('League of Legends pressed')
        },
        {
            id: 2,
            title: 'VALORANT',
            categories: ['FPS', 'TACTICAL SHOOTER'],
            imageSource: require('../assets/images/valorant.jpg'),
            onPress: () => console.log('Valorant pressed')
        },
        {
            id: 3,
            title: 'DOTA 2',
            categories: ['MOBA', 'STRATEGY'],
            imageSource: require('../assets/images/dota.jpg'),
            onPress: () => console.log('Dota 2 pressed')
        }
    ];

    return(
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.first}>
                    <Text style={styles.firstText}>
                        HOW TO DOMINATE
                    </Text>
                    <Text style={styles.firstParagraph}>
                        Take control of your e-sport journey with our all-in-one tournament management
                        platform. Register teams, track live matches, and dominate tournaments with your
                        real-time updates and ai-powered predictions.{'\n'}{'\n'}
                        Whether you are a player, team manager, or organizer, our system helps you analyze,
                        strategize, and win. now and rise to the top!
                    </Text>
                    <View style={{paddingBottom: 25}}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>
                                JOIN TOURNAMENT
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.gameList}>
                    <Text style={styles.gameListText}>
                        GAME LIST
                    </Text>
                    <Text style={styles.gameListSubText}>
                        You can view all the games where you can find friends.
                    </Text>
                    <View style={styles.cards}>
                        {games.map(game => (
                            <GameCard
                                key={game.id}
                                title={game.title}
                                categories={game.categories}
                                imageSource={game.imageSource}
                                onPress={game.onPress}
                            />
                        ))}
                    </View>
                    <View style={{padding:10,paddingBottom:25}}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>
                                JOIN THE ACTION
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
    },
    container: {
        flex: 1,
    },
    first:{
        paddingTop: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(6,8,27)',
    },
    firstText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        paddingBottom: 15,
    },
    firstParagraph:{
        color: 'rgba(221,221,221,0.9)',
        paddingBottom: 15,
        padding: 10,
    },
    button: {
        backgroundColor: 'rgba(9,28,63,0.9)',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderRightColor: 'rgb(4,217,4)',
        borderBottomColor: 'rgb(4,217,4)',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    gameList:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',

        paddingBottom: 30,
    },
    gameListText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        paddingBottom: 5,
    },
    gameListSubText: {
        color: 'rgba(221,221,221,0.9)',
        marginBottom: 20,
    },
    cards: {
        width: '100%',
        alignItems: 'center',
    },
    // Game card styles
    cardContainer: {
        width: '95%',
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '70%',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 16,
        width: '100%',
    },
    titleText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryBadge: {
        backgroundColor: 'transparent',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'rgb(4,217,4)', // Matching your button border color
    },
    categoryText: {
        color: 'rgb(4,217,4)', // Matching your button border color
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});