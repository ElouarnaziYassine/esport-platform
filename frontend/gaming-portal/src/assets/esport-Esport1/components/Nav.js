import { TouchableOpacity, View, Text, StyleSheet, Animated } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Nav() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState('');
  const slideAnim = useState(new Animated.Value(-200))[0];

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (e) {
        console.error('Failed to load username:', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadUsername);
    return unsubscribe;
  }, [navigation]);

  const toggleMenu = () => {
    const toValue = menuVisible ? -200 : 0;
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screenName) => {
    toggleMenu(); // Close the menu
    navigation.navigate(screenName);
  };

  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <Text style={styles.navText}>
            Gaming <Text style={styles.dot}>.</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.menu, { right: slideAnim }]}>
        {username ? (
          <View style={[styles.menuItem, styles.usernameDisplay]}>
            <View style={styles.menuItemInner}>
              <FontAwesome name="user" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
              <Text style={styles.menuText}>Hello, {username}</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
          <View style={styles.menuItemInner}>
            <FontAwesome name="home" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
            <Text style={styles.menuText}>HOME BASE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Tournaments')}>
          <View style={styles.menuItemInner}>
            <FontAwesome name="trophy" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
            <Text style={styles.menuText}>TOURNAMENTS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Leaderboard')}>
          <View style={styles.menuItemInner}>
            <FontAwesome name="list-ol" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
            <Text style={styles.menuText}>LEADERBOARD</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Watch')}>
          <View style={styles.menuItemInner}>
            <FontAwesome name="play-circle" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
            <Text style={styles.menuText}>WATCH</Text>
          </View>
        </TouchableOpacity>

        

        <TouchableOpacity style={[styles.menuItem, styles.signInItem]} onPress={() => navigateTo('SignIn')}>
          <View style={styles.menuItemInner}>
            <FontAwesome name="sign-in" size={16} color="rgb(0, 237, 0)" style={styles.menuIcon} />
            <Text style={styles.menuText}>SIGN OUT</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,
    marginTop: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dot: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(0, 237, 0)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
  },
  menu: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: 'rgba(17, 24, 39, 1)',
    width: 200,
    zIndex: 2,
    borderBottomLeftRadius: 8,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 237, 0, 0.3)',
  },
  menuItem: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 41, 59, 1)',
  },
  menuItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59,1)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: 'rgb(0, 237, 0)',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signInItem: {
    borderBottomWidth: 0,
  },
  usernameDisplay: {
    marginBottom: 4,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
});
