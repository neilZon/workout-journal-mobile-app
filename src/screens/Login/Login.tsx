import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  Pressable,
  Box,
  Input,
  FormControl,
  Button,
  VStack,
  Text,
  Flex,
} from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login } from '../../services/auth';
import UserContext from '../../contexts/userContext';

const Login = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const [formData, setData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState<null | string>(null);

  /**
   *
   */
  const submit = async () => {
    try {
      const { access_token, refresh_token } = await login(formData);
      setUserData({
        accessToken: access_token,
        refreshToken: refresh_token,
        signedOut: false,
      });
      navigation.navigate('Home');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <Box p={2} safeArea>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack>
          <FormControl>
            <Text fontSize={32} pb={8} fontWeight="bold">
              Workout Journal
            </Text>

            <Text color="red.500">{error}</Text>

            <Box pb={3}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                size="xl"
                p={4}
                variant="rounded"
                placeholder="Email"
                onChangeText={(text) => setData({ ...formData, email: text })}
                autoCapitalize="none"
              />
            </Box>

            <Box pb={6}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                size="xl"
                p={4}
                variant="rounded"
                placeholder="Password"
                onChangeText={(text) =>
                  setData({ ...formData, password: text })
                }
                autoCapitalize="none"
              />
            </Box>
          </FormControl>

          <Button size="lg" py={2} onPress={submit}>
            Login
          </Button>

          <Flex flexDirection="row" justify="center">
            <Pressable p={4} onPress={() => navigation.navigate('Signup')}>
              <Text underline fontSize={16}>
                Signup
              </Text>
            </Pressable>
          </Flex>
        </VStack>
      </TouchableWithoutFeedback>
    </Box>
  );
};

export default Login;
