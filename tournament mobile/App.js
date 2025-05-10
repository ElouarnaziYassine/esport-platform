import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import Tournaments from './components/Tournaments';
import Watch from './components/Watch';
import Leaderboard from './components/Leaderboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Tournaments" component={Tournaments} />
                <Stack.Screen name="Watch" component={Watch} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
