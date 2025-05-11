import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.56.1:8080'; // Your backend URL

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('PLAYER');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const user = {
      username,
      email,
      password,
      role: selectedRole
    };

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, user);

      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        Alert.alert('Registration Failed', error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        Alert.alert('Network Error', 'Unable to connect to the server. Please check your connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to join the battle</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'SIGNING UP...' : 'SIGN UP'}</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Log In</Text>
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
  buttonDisabled: {
    backgroundColor: '#00994f',
  },
  buttonText: { fontWeight: 'bold', color: '#000' },
  bottomText: { marginTop: 20, color: '#ccc' },
  link: { color: '#00ff88' },
});
