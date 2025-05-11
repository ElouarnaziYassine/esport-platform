import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Simulate login (you should add real login validation here)
    if (username && password) {
      try {
        await AsyncStorage.setItem('username', username); // Save username for later use
     
        navigation.navigate('Home'); // Navigate to home or leaderboard after login
      } catch (error) {
        console.error('Error saving username', error);
        alert('Login failed. Try again.');
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#aaa', marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 5,
    padding: 12,
    marginVertical: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00ff88',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { fontWeight: 'bold', color: '#000' },
  bottomText: { marginTop: 20, color: '#ccc' },
  link: { color: '#00ff88' },
});