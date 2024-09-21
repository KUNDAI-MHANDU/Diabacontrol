import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, useWindowDimensions, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import LottieView from 'lottie-react-native';

export default function FoodScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [result, setResult] = useState();
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState(false);
  const { width } = useWindowDimensions();
  let cameraRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25", "48", "75"];

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
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
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
        const prompt = "based on the image provided give a rough estimate of how many carbohydrates the food may contain. no accuracy needed";
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
      <SafeAreaView style={styles.container2}>
        <BottomSheetModalProvider>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
            onDismiss={() => {setIsOpen(false); setPhoto(undefined)}}
          >
            <View style={styles.contentContainer}>
              <Text>{result || "Processing..."}</Text>
            </View>
            <View style={{alignItems: 'center', gap: 10,}}>
              <TouchableOpacity style={styles.button} onPress={sharePic}>
                <Text>Share</Text>
                <View style={{height: 40, width: 40}}>
                  <LottieView source={require("../../assets/Animation - 1726873846333.json")}
                    style={{width: "100%", height: "100%"}}
                    autoPlay
                    loop
                  />
                </View>
              </TouchableOpacity>
              {hasMediaLibraryPermission && 
                <TouchableOpacity style={styles.button} onPress={savePhoto}>
                  <Text>Save</Text>
                  <View style={{height: 40, width: 40}}>
                  <LottieView source={require("../../assets/Animation - 1726881867919.json")}
                    style={{width: "100%", height: "100%"}}
                    autoPlay
                    loop
                  />
                  </View>
                </TouchableOpacity>
              }
              <TouchableOpacity style={styles.button}>
                <Text>Close</Text>
                <View style={{height: 40, width: 40}}>
                <LottieView source={require("../../assets/Animation - 1726879046163.json")}
                    style={{width: "100%", height: "100%"}}
                    autoPlay
                    loop
                  />
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
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
          <TouchableOpacity style={styles.Camerabutton} onPress={takePic}>
          <View style={{height: 150, width: 150}}>
                <LottieView source={require("../../assets/Animation - 1726881318059.json")}
                    style={{width: "100%", height: "100%"}}
                    autoPlay
                    loop
                  />
                </View>
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
  Camerabutton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: "orange",
    borderRadius: 10,
    height: 40,
    justifyContent: 'space-around',
    width: "70%",
    alignItems: 'center'
  },
});
