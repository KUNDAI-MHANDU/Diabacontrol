import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { GoogleGenerativeAI } from "@google/generative-ai";
import LottieView from 'lottie-react-native';

const InsulinReport = () => {

    const [insulinDose, setInsulinDose] = useState([]);
    const [insulineResults, setInsulineResults] = useState();
    const [showSummary, setShowSummary] = useState(false);
    const genAI = new GoogleGenerativeAI("AIzaSyBHiTjGZn3oEcmhhNCRCKnMGAq9beN2ncw");

    useEffect(() => {
        const fetchData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const data = result.map(req => JSON.parse(req[1]));
            
            const insulinValues = data.map(record => parseFloat(record.insulinDose));
            const dates = data.map(record => record.date.split(',')[0]); // Use the date without time
            setInsulinDose({dates, insulinValues});
        } catch (e) {
            console.log('Failed to load data');
        }
        };

        const InsulinSummary = async () => {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const data = result.map(req => JSON.parse(req[1]));
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const prompt = `Based on the following insulin dose data in units for a diabetic person, what can you tell me about this data:
            ${JSON.stringify(data)}`;
            
            try {
              const generatedContent = await model.generateContent([prompt]);
              setInsulineResults(generatedContent.response.text());
            } catch (error) {
              console.error("Error generating content:", error);
            }
        };

        fetchData();
        InsulinSummary();
    }, []);


  return (
    <View>
                    <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginVertical: 20,
            }}>Insulin Dose (units)</Text>
        {insulinDose.insulinValues?.length > 0 ? (
        <View>
            <LineChart
            data={{
                labels: insulinDose.dates.slice(-4),  // Show the last 7 entries
                datasets: [
                {
                    data: insulinDose.insulinValues.slice(-4),  // Show the last 7 entries
                }
                ]
            }}
            width={Dimensions.get('window').width} // Adjust width to fit screen
            height={220}
            yAxisLabel=""
            yAxisSuffix="u"
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
            }}
            />
            <Button
            title={showSummary ? "Hide Summary" : "View Summary"}
            onPress={() => setShowSummary(!showSummary)}
          />
           {showSummary && (
            <View>
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginVertical: 20,
            }}>Insulin Dose summary</Text>
            <Text>{insulineResults || "Processing..."}</Text>
            </View>
        )}
        </View>
      ) : (
        <View style={{height: 240, width: "100%",}}>
            <LottieView source={require("../assets/Animation - 1728057238684.json")}
            style={{width: "100%", height: "100%"}}
            autoPlay
            loop
            />
        </View>
      )}
    </View>
  )
}

export default InsulinReport