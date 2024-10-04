import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordContent from '../../components/RecordContent';

export default function RecordDataScreen() {
  const [carbCount, setCarbCount] = useState('');
  const [insulinDose, setInsulinDose] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');

  const saveData = async () => {
    try {
      const record = {
        carbCount,
        insulinDose,
        glucoseLevel,
        date: new Date().toLocaleString(),
      };
      await AsyncStorage.setItem(`record-${Date.now()}`, JSON.stringify(record));
      Alert.alert('Data Saved', 'Your data has been successfully saved.');
      setCarbCount('');
      setInsulinDose('');
      setGlucoseLevel('');
    } catch (e) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Record Data</Text>

        <RecordContent/>

        <TextInput
          style={styles.input}
          placeholder="Carbohydrate Count (g)"
          keyboardType="numeric"
          value={carbCount}
          onChangeText={setCarbCount}
        />
        <TextInput
          style={styles.input}
          placeholder="Insulin Dose (units)"
          keyboardType="numeric"
          value={insulinDose}
          onChangeText={setInsulinDose}
        />
        <TextInput
          style={styles.input}
          placeholder="Blood Glucose Level (mg/dL)"
          keyboardType="numeric"
          value={glucoseLevel}
          onChangeText={setGlucoseLevel}
        />

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Save Data</Text>
        </TouchableOpacity>
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
    paddingBottom: 40, // extra space for keyboard
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
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
    marginBottom: 20,
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
});
