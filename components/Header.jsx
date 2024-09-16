import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';

const Header = () => {

  const { user } = useUser();

  return (
    <View style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'orange',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <View style={{
            display: "flex",
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        }}>
                <Image style={{
                    width: 45,
                    height: 45,
                    borderRadius: 99
                }} source={{uri:user?.imageUrl}}/>
                <View>
                    <Text style={{
                        color: 'white'
                    }}>Welcome</Text>
                    <Text style={{
                        fontSize: 19,
                        color: 'white'
                    }}>{user?.fullName}</Text>
                </View>
            </View>
            <Ionicons name="notifications-sharp" size={24} color="white" />
        </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 7,
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
        borderRadius: 8,
        marginTop: 10
      }}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput placeholder='Search'/>
      </View>
    </View>
  )
}

export default Header