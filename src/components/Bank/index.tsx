/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Container, LogoBanco, InfoArea, NomeBanco, Produtos,
} from './styles';

interface Data {
    logo: string;
    name: string;
    emprestimoPessoal: number;
    chequeEspecial: number;
}

// Futuras implementações

const Bank: React.FC<Data> = ({
  logo, name, emprestimoPessoal, chequeEspecial,
}) => (
        <Container>
            <LogoBanco source={{ uri: 'http://giovanni.smartbr.com:3000'.concat(logo) }} />
            <InfoArea>
                <NomeBanco>
                    {name}
                </NomeBanco>
                <Produtos>
                    Taxa do Emprestimo Pessoal:
                {emprestimoPessoal}
                </Produtos>
                <Produtos>
                    Taxa do Cheque Especial:
                {chequeEspecial}
                </Produtos>
            </InfoArea>
        </Container>
);

export default Bank;
