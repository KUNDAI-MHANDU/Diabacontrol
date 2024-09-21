import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import SignNavigation from './app/Screens/_layout'
import MainLayout from './app/_layout';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}


export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
          <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SignedIn>
          <MainLayout/>
        </SignedIn>
        <SignedOut>
          <SignNavigation/>
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

