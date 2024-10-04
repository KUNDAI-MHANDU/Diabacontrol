import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { GoogleGenerativeAI } from "@google/generative-ai";
import LottieView from 'lottie-react-native';

const GlucoseReport = () => {

    const [glucoseData, setGlucoseData] = useState([]);
    const [glucoseResults, setGlucoseResults] = useState();
    const [showSummary, setShowSummary] = useState(false); 
    const genAI = new GoogleGenerativeAI("AIzaSyBHiTjGZn3oEcmhhNCRCKnMGAq9beN2ncw");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const data = result.map(req => JSON.parse(req[1]));
            
            const glucoseValues = data.map(record => parseFloat(record.glucoseLevel));
            const dates = data.map(record => record.date.split(',')[0]); // Use the date without time
            setGlucoseData({ dates, glucoseValues });
    
      
          } catch (e) {
            console.log('Failed to load data');
          }
        };
    
        const GlucoseSummary = async () => {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const data = result.map(req => JSON.parse(req[1]));
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const prompt = `Based on the following Blood Glucose Level (mg/dL) data for a diabetic person, what can you tell me about this data:
            ${JSON.stringify(data)}`;
            
            try {
              const generatedContent = await model.generateContent([prompt]);
              setGlucoseResults(generatedContent.response.text());
            } catch (error) {
              console.error("Error generating content:", error);
            }
        }
        fetchData();
        GlucoseSummary();
      }, []);

  return (
    <View style={{marginBottom: 20}}>
          {glucoseData.glucoseValues?.length > 0 ? (
        <View>
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginVertical: 20,
            }}>Blood Glucose Level (mg/dL)</Text>
            <BarChart
                data={{
                    labels: glucoseData.dates.slice(-4),  // Show the last 7 entries
                    datasets: [
                    {
                        data: glucoseData.glucoseValues.slice(-4),  // Show the last 7 entries
                    }
                    ]
                }}
        width={Dimensions.get('window').width} // Adjust width to fit screen
        height={220}
        yAxisLabel=""
        yAxisSuffix="mg/dl"
        chartConfig={{
            backgroundColor: "#022173",
            backgroundGradientFrom: "#022173",
            backgroundGradientTo: "#1b3fa0",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
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
            }}>Blood Glucose Level summary</Text>
        <Text>{glucoseResults || "Processing..."}</Text>
        </View>
        )}
    </View>
      ):(
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

export default GlucoseReport