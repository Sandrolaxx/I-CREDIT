/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useCallback, useRef } from 'react';
import {
  Image, StatusBar, KeyboardAvoidingView, Platform, TextInput, Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import loginImg from '../../assets/create_Account.png';
import {
  Container, Title,
} from './styles';

interface SignUpFormData {
  nome: string;
  email: string;
  senha: string;
  cpf:string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatorio!'),
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('E-mail obrigatorio'),
          senha: Yup.string().required('Senha obrigatoria!'),
          cpf: Yup.string().required('CPF obrigatorio'),
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

          <Title>Crie sua conta</Title>
          <Form ref={formRef} onSubmit={handleSignUp} >
            <Input
              autoCapitalize="words"
              name='nome'
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
                senhaInputRef.current?.focus();
              }}
            />
            <Input
              ref={senhaInputRef}
              secureTextEntry
              name='senha'
              icon='lock'
              placeholder='Senha'
              returnKeyType="next"
              onSubmitEditing={() => {
                cpfInputRef.current?.focus();
              }}
            />
            <Input
              ref={cpfInputRef}
              autoCorrect={false}
              name='cpf'
              icon='key'
              placeholder='CPF'
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
