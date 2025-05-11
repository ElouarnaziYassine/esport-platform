import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Layout from './Layout';
import TournamentContent from "./TournamentContent";


export default function Home() {
    return (
        <Layout title={"TOURNAMENTS"} text={"EXPLORE UPCOMING AND ONGOING TOURNAMENTS"}>
          
            <TournamentContent />
        
        </Layout>
    );
}
