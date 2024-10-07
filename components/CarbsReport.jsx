import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { GoogleGenerativeAI } from "@google/generative-ai";
import LottieView from 'lottie-react-native';

const CarbsReport = () => {
  const [carbAmount, setCarbAmount] = useState([]);
  const [carbsResults, setCarbsResults] = useState();
  const [showSummary, setShowSummary] = useState(false); // State to toggle summary visibility
  const genAI = new GoogleGenerativeAI("AIzaSyBHiTjGZn3oEcmhhNCRCKnMGAq9beN2ncw");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const data = result.map(req => JSON.parse(req[1]));

        const carbsValue = data.map(record => parseFloat(record.carbCount));
        const dates = data.map(record => record.date.split(',')[0]); // Use the date without time
        setCarbAmount({ dates, carbsValue });
      } catch (e) {
        console.log('Failed to load data');
      }
    };

    const CarbsSummary = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const data = result.map(req => JSON.parse(req[1]));
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Based on the following carbohydrate data in grams for a diabetic person, what can you tell me about this data:
            ${JSON.stringify(data)}`;

      try {
        const generatedContent = await model.generateContent([prompt]);
        setCarbsResults(generatedContent.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    };

    fetchData();
    CarbsSummary();
  }, []);

  return (
    <View>
        <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginVertical: 20,
            }}
          >
            Carbohydrate Intake (g)
        </Text>
      {carbAmount.carbsValue?.length > 0 ? (
        <View>
          <BarChart
            data={{
              labels: carbAmount.dates.slice(-4), // Show the last 7 entries
              datasets: [
                {
                  data: carbAmount.carbsValue.slice(-4), // Show the last 7 entries
                },
              ],
            }}
            width={Dimensions.get('window').width} // Adjust width to fit screen
            height={220}
            yAxisLabel=""
            yAxisSuffix="g"
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

          {/* Button to toggle the summary */}
          <Button
            title={showSummary ? "Hide Summary" : "View Summary"}
            onPress={() => setShowSummary(!showSummary)}
          />

          {/* Conditionally render the carbohydrate summary */}
          {showSummary && (
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#333',
                  textAlign: 'center',
                  marginVertical: 20,
                }}
              >
                Carbohydrate Summary
              </Text>
              <Text>{carbsResults || "Processing..."}</Text>
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
  );
};

export default CarbsReport;
