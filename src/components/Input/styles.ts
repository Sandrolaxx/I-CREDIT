/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 50px;
    background: #FDFDFD;
    border-radius: 85px;
    margin-top: 20px;
    flex-direction: row;
    border-width: 2px;
    border-color: #FDFDFD;
    align-items: center;

    ${(props) => props.isErrored && css`
        border-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        border-color: #3c996a;
    `}
`;

export const TextInput = styled.TextInput`
    flex: 1;
    font-size: 20px;
    font-family: 'RobotoMono-Medium';
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 35px;
    margin-left: 20px;
`;
