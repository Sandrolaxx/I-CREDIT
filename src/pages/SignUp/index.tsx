/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useCallback, useRef } from 'react';
import {
  Image, StatusBar, KeyboardAvoidingView, Platform, TextInput, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import loginImg from '../../assets/create_Account.png';
import api from '../../services/api';

import {
  Container, Title,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  document:string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const documentInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio!'),
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('E-mail obrigatorio'),
          password: Yup.string().required('Senha obrigatoria!'),
          document: Yup.string()
            .min(11, 'CPF/CNPJ no mínimo 11 dígitos!')
            .max(14, 'CPF/CNPJ máximo 14 dígitos!')
            .required('CPF/CNPJ obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/auth/register', data);

        Alert.alert('Cadastro realizado com sucesso! Já pode fazer login no App');

        navigation.goBack();
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
    [navigation],
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

          <Title>Crie sua conta</Title>
          <Form ref={formRef} onSubmit={handleSignUp} >
            <Input
              autoCapitalize="words"
              name='name'
              icon='user'
              placeholder='Nome'
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
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
              name='password'
              icon='lock'
              placeholder='Senha'
              returnKeyType="next"
              onSubmitEditing={() => {
                documentInputRef.current?.focus();
              }}
            />
            <Input
              ref={documentInputRef}
              autoCorrect={false}
              name='document'
              icon='key'
              placeholder='CPF/CNPJ'
              returnKeyType="send"
              onSubmitEditing={() => { formRef.current?.submitForm(); }}
            />
          </Form>
          <Button onPress={() => { formRef.current?.submitForm(); }}>
            CRIAR
          </Button>

          <Image source={loginImg} />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;

// const handleSignUp = useCallback((data: object) => {
//   console.log(data);
// }, []);
