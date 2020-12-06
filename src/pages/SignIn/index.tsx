/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useCallback, useRef, useState } from 'react';
import {
  Image, StatusBar, Switch, KeyboardAvoidingView, Platform, TextInput, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';

import loginImg from '../../assets/login.png';
import {
  Container, Title, ForgotPassword, ForgotPasswordText, RememberMe,
  RememberMeText, CreateAccount, CreateAccountText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
  }

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState):boolean => !previousState);
  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('E-mail obrigatorio'),
          senha: Yup.string().required('Senha obrigatoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticacao',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [],
  );

  return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <StatusBar backgroundColor='#00C7B0' />

                <Container>
                    <Title>AUTENTIQUE-SE</Title>

                    <Form ref={formRef} onSubmit={handleSignIn} >
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name='email'
                            icon='mail'
                            placeholder='E-mail'
                            returnKeyType="next"
                            onSubmitEditing={() => {
                              passwordInputRef.current?.focus();
                            }}
                        />
                        <Input
                            ref={passwordInputRef}
                            secureTextEntry
                            name='senha'
                            icon='lock'
                            placeholder='Senha'
                            returnKeyType="send"
                            onSubmitEditing={() => { formRef.current?.submitForm(); }}
                        />

                    </Form>
                    <RememberMe>
                        <Switch
                            trackColor={{ false: '#767577', true: '#3c996a' }}
                            thumbColor={isEnabled ? '#00C7B0' : '#ffff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <RememberMeText>Lembrar senha</RememberMeText>
                    </RememberMe>

                    <ForgotPassword onPress={() => { }} >
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPassword>

                    <CreateAccount onPress={() => navigation.navigate('SignUp')} >
                        <Icon name='user-plus' size={45} color='#3c996a' />
                        <CreateAccountText>CRIAR CONTA</CreateAccountText>
                    </CreateAccount>

                    <Button onPress={() => { formRef.current?.submitForm(); }}>ENTRAR</Button>

                    <Image source={loginImg} />
                </Container>
            </KeyboardAvoidingView>
        </>
  );
};
export default SignIn;
