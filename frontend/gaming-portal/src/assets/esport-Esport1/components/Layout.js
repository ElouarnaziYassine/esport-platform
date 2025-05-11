import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';

const image = require('../assets/images/home.png');

export default function Layout({ children,title,text }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    source={image}
                    style={styles.background}
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.overlay} />
                    <Nav />
                    <Header title={title} text={text} />
                </ImageBackground>
                <View style={styles.content}>
                    {children}
                </View>
                <Footer />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a23', // fond sombre comme ta capture
      },
    background: {
        width: '100%',
    },
    imageStyle: {
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
    }
}); 