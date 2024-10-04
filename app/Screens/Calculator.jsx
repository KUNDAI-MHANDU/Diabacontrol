import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CalcuContent from '../../components/CalcuContent';

export default function InsulinCalculator() {
  const [carbs, setCarbs] = useState(0);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [targetBloodSugar, setTargetBloodSugar] = useState(100);
  const [icr, setIcr] = useState(10); // insulin-to-carb ratio
  const [isf, setIsf] = useState(50); // insulin sensitivity factor
  const [insulinDose, setInsulinDose] = useState(0);

  const calculateDose = () => {
    const correctionDose = (bloodSugar - targetBloodSugar) / isf;
    const carbDose = carbs / icr;
    const totalDose = correctionDose + carbDose;
    setInsulinDose(totalDose > 0 ? totalDose.toFixed(1) : 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Insulin Calculator</Text>

        <CalcuContent/>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Carbohydrate Intake (grams)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter carbs"
            onChangeText={text => setCarbs(parseFloat(text))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Blood Sugar Level (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter blood sugar"
            onChangeText={text => setBloodSugar(parseFloat(text))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Target Blood Sugar Level (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter target"
            onChangeText={text => setTargetBloodSugar(parseFloat(text))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insulin-to-Carb Ratio (ICR)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter ICR"
            onChangeText={text => setIcr(parseFloat(text))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insulin Sensitivity Factor (ISF)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter ISF"
            onChangeText={text => setIsf(parseFloat(text))}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateDose}>
          <Text style={styles.buttonText}>Calculate Insulin Dose</Text>
        </TouchableOpacity>

        <Text style={styles.result}>Total Insulin Dose: {insulinDose} units</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom for keyboard space
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
