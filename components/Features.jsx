import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Features = () => {

    const navigation = useNavigation();

  return (
    <View>
        <Text style={{
                fontSize: 20,
                padding: 20,
                fontWeight: 'bold'
            }}>Features</Text>
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                gap: 20
            }}>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('calculator')}>
                    <Entypo style={styles.features} name="calculator" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Calculator</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('reports')}>
                    <FontAwesome style={styles.features} name="list-alt" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fContainer}>
                    <Fontisto style={styles.features} name="first-aid-alt" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Hypoglycemic</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                display: 'flex',
                gap: 20
            }}>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('videos')}>
                    <Entypo style={styles.features} name="folder-video" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('communite_chat')}>
                    <FontAwesome style={styles.features} name="wechat" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Ask Communite</Text>
                </TouchableOpacity>
                <View style={styles.fContainer}>
                    <Ionicons style={styles.features} name="fast-food" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Food Suggestions</Text>
                </View>
            </View>
            <View style={{
                display: 'flex',
                gap: 20
            }}>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('records')}>
                    <Feather style={styles.features} name="save" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Record Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fContainer} onPress={() => navigation.navigate('Diaba_Intelligence')}>
                    <FontAwesome5 style={styles.features} name="brain" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Ask AI</Text>
                </TouchableOpacity>
                <View style={styles.fContainer}>
                    <MaterialCommunityIcons style={styles.features} name="head-heart" size={34} color="orange" />
                    <Text style={{
                        fontSize: 12,
                    }}>Tips for Diabetes</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5, 
    }
})

export default Features
