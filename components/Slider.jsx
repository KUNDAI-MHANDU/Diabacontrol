import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const Slider = () => {
    const [sliderList, setSliderList] = useState([]);
    const flatListRef = useRef(null);
    const scrollIndex = useRef(0);

    useEffect(() => {
        GetSlider();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderList.length > 0) {
                scrollIndex.current = (scrollIndex.current + 1) % sliderList.length;
                flatListRef.current.scrollToIndex({ index: scrollIndex.current, animated: true });
            }
        }, 5000); 

        return () => clearInterval(interval);
    }, [sliderList]);

    const GetSlider = async () => {
        setSliderList([]);
        const q = query(collection(db, 'slider'));
        const querySnapShot = await getDocs(q);

        let sliderData = [];
        querySnapShot.forEach((doc) => {
            console.log(doc.data());
            sliderData.push(doc.data());
        });
        setSliderList(sliderData);
    };

    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

    return (
        <View>
            <Text style={styles.title}>#Offers for you</Text>

            <FlatList
                ref={flatListRef}
                data={sliderList}
                horizontal={true}
                style={styles.flatList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openLink(item.url)}>
                        <Image 
                            source={{ uri: item.imageUrl }}
                            style={styles.image} 
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
    },
    flatList: {
        paddingLeft: 20,
    },
    image: {
        width: 300,
        height: 160,
        borderRadius: 15,
        marginRight: 20,
    },
});

export default Slider;
