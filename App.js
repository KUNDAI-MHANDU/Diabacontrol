import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo'
import SignNavigation from './app/Screens/_layout'
import MainLayout from './app/_layout';
import { NavigationContainer } from '@react-navigation/native';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {

  return (
    <NavigationContainer>
          <ClerkProvider publishableKey={publishableKey}>
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
  );
}

