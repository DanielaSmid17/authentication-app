import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import IconButton from './components/ui/IconButton'

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen}
      options={{
        headerRight: ({tintColor}) => <IconButton icon='exit' color={tintColor} size={24} onPress={authContext.logout} />
      }}  />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root () {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authContext = useContext(AuthContext)
  useEffect(() => {
    async function fetchToken () {
      try{
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) authContext.authenticate(storedToken)

      } catch (e) {
        console.error('Could not fetch data: ', e.message)
      }
      setIsTryingLogin(false)
    }
    fetchToken()
}, [])
if (isTryingLogin) return <AppLoading />
return <Navigation />
}

export default function App() {



  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>

    </>
  );
}
