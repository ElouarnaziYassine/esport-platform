import {Text, View, StyleSheet} from "react-native";
import React from "react";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Footer() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Gaming{" "}
                    <Text style={styles.dot}>.</Text>
                </Text>
                <View style={styles.icons}>
                    <SimpleLineIcons name="social-facebook" size={15} color="white" />
                    <FontAwesome6 name="instagram" size={15} color="white" />
                    <MaterialIcons name="discord" size={15} color="white" />
                    <Fontisto name="twitch" size={15} color="white" />
                    <Feather name="youtube" size={15} color="white" />
                    <FontAwesome5 name="linkedin" size={15} color="white" />
                    <FontAwesome5 name="twitter-square" size={15} color="white" />
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.bottomText}>About</Text>
                <Text style={styles.bottomText}>Tournament</Text>
                <Text style={styles.bottomText}>Making</Text>
            </View>
           <View style={{justifyContent:'center', alignItems: 'center',marginTop:10}}>
               <Text style={{color:'white'}}>
                   Privacy policy - terms of use
               </Text>
           </View>
        </View>

    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor: 'rgb(6,8,27)',
        padding:20,
        paddingBottom:30,
    },
    header:{
      alignItems:"center",
    },
    headerText:{
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    dot: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgb(0, 237, 0)',
    },
    icons:{
        display: 'flex',
        flexDirection:'row',
        gap:20,
        padding:10
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:35,
        gap:30
    },
    bottomText:{
        color:'#fff',
    }
})