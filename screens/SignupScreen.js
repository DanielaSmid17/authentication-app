import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverLay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authContext = useContext(AuthContext);

  const signupHandler = async ({email, password}) => {
    setIsAuthenticating(true)
    try{
      const token = await createUser(email, password)
      authContext.authenticate(token)
    } catch (e){
      Alert.alert('Authentication failed', 'Could not sign you in, please check your input and try again later!')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) return <LoadingOverLay message='Creating user' />;
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
