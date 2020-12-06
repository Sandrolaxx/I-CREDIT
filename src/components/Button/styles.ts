/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 50px;
    background: #2AB887;
    border-radius: 85px;

    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
    color: #FDFDFD;
    font-family: 'RobotoMono-Bold';
    font-size: 20px;
`;
