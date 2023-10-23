import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const authContext = useContext(AuthContext);
  const token = authContext.token

    useEffect(()=> {
      axios.get(`https://authentication-app-58a8b-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`)
        .then((res)=> {
          setFetchedMessage(res.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
