import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #F3F3F3;
    flex:1;
    align-items: center;
    margin-top: 25px;
    padding: 0 80px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #212121;
    font-family: 'RobotoMono-Bold';
`;

export const RememberMe = styled.View`
    flex-direction: row;
    margin-top: 15px;
    align-self: flex-start;
`;

export const RememberMeText = styled.Text`
    margin-top: 2px;
    font-size: 15px;
    font-family: 'Roboto-Medium';
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 10px;
    align-self: flex-end;
    font-family: 'RobotoMono-Medium';
`;

export const ForgotPasswordText = styled.Text`
    font-family: 'Roboto-Medium';
    font-size: 15px;
`;

export const CreateAccount = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 30px;
    font-family: 'RobotoMono-Medium';
`;

export const CreateAccountText = styled.Text`
    font-size: 20px;
    margin-left: 10px;
    font-family: 'RobotoMono-Bold';
    margin-top: 10px;
`;
