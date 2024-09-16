import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function FoodScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [result, setResult] = useState();
  const [visible, setVisible] = useState(false);
  let cameraRef = useRef();
  
  const genAI = new GoogleGenerativeAI("AIzaSyBHiTjGZn3oEcmhhNCRCKnMGAq9beN2ncw");

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setVisible(true);
  };

 
  useEffect(() => {
    if (photo) {
      const generateImageContent = async () => {
        const fileToGenerativePart = async (path, mimeType) => {
          const fileContent = await FileSystem.readAsStringAsync(path, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return {
            inlineData: {
              data: fileContent,
              mimeType
            },
          };
        };

        const filePart1 = await fileToGenerativePart(photo.uri, "image/jpeg");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = "based on the image provided give a rough estimate of how many carbohydrates the food may contain";
        const imageParts = [filePart1];
        
        try {
          const generatedContent = await model.generateContent([prompt, ...imageParts]);
          setResult(generatedContent.response.text());
        } catch (error) {
          console.error("Error generating content:", error);
        }
      };

      generateImageContent();
    }
  }, [photo]);  // Only runs when `photo` changes

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
        setResult(undefined)
        setVisible(undefined)
      });
    };

    const savePhoto = () => {
      if (hasMediaLibraryPermission) {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
          setPhoto(undefined);
          setResult(undefined)
          setVisible(undefined)
        });
      }
    };

    return (
      <SafeAreaView>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Modal visible={visible} style={{ height: 50 }}>
            <Text>{result || "Processing..."}</Text>
            <Button title="Share" onPress={sharePic} />
            {hasMediaLibraryPermission && <Button title="Save" onPress={savePhoto} />}
            <Button title="Close" onPress={() => setVisible(false)} />
        </Modal>
      </SafeAreaView>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePic}>
            <MaterialCommunityIcons name="line-scan" size={84} color={"white"} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});
