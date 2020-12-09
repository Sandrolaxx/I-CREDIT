// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import {
  Alert, BackHandler,
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
  Container, Title, ListArea, ConsenseText, NoConsenseText,
} from './styles';
import Button from '../../components/Button';
import api from '../../services/api';
import Bank from '../../components/Bank';

interface Data {
  logo: string;
  name: string;
  emprestimoPessoal: number;
  chequeEspecial: number;
}

const Main: React.FC = () => {
  const url = 'https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/auth?response_type=code&client_id=PSDBR-NCA-ISCREDIT&redirect_uri=https%3A%2F%2Fdeveloper.obiebank.banfico.com%2Fcallback&state=1512613507629&nonce=1701650919106&request=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dGgub2JpZWJhbmsuYmFuZmljby5jb20vYXV0aC9yZWFsbXMvcHJvdmlkZXIiLCJpc3MiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJjbGllbnRfaWQiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2RldmVsb3Blci5vYmllYmFuay5iYW5maWNvLmNvbS9jYWxsYmFjayIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWNjb3VudHMiLCJzdGF0ZSI6MTUxMjYxMzUwNzYyOSwibm9uY2UiOjE3MDE2NTA5MTkxMDYsImV4cCI6MTYwNzMxMjA2MCwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJjbGFpbXMiOnsidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoidXJuOm9iaWViYW5rOmFjY291bnRzOmJmZDljMmM2LTY1Y2ItNDUzMi05ODhjLTE1YjU3MWIzY2I5ZSIsImVzc2VudGlhbCI6dHJ1ZX19LCJpZF90b2tlbiI6eyJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiJ1cm46b2JpZWJhbms6YWNjb3VudHM6YmZkOWMyYzYtNjVjYi00NTMyLTk4OGMtMTViNTcxYjNjYjllIiwiZXNzZW50aWFsIjp0cnVlfSwiYWNyIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWVzIjpbInVybjpvcGVuYmFua2luZzpwc2QyOnNjYSIsInVybjpvcGVuYmFua2luZzpwc2QyOmNhIl19fX0sImlhdCI6MTYwNzMwODQ2MH0.GLuqNmpG3dNIuDpT_JMhhIvZMM-fZG9_n9qzzb_nMSxRCn6QS-D8muE1ZMfUusGeb8mp1lCS16JjZGKe7dAvJIW_A2uD9VU7cBp4b9Jr2dkOPNvLhwBvqBI-6lQGdLBzGhKWm4AYjmExExBW3SMNEbgn42XN138DdSWIBXNVcl8S3Qu8R5LY61Rzb714ft5uLoVJTgMO84rySoIVdbAxxd_uKOAeuH3nq8KT8SdblB6ZMBpGlMVQVt6PK3l-4qFIk-rtxzwTIRqtXNU_rnWJFqecR1XSqzMPsRwlhJdwbBLEKZaEgg8Y3btWpi-5O6Jvy0NN2gZR2ps9m61RjxjqOw';
  const [go, setGo] = useState(false);

  const autenticar = async () => {
    // const res = await api.get('/getConsent');
    // if (res.status === 200) {
    //   console.log(res.data);
    setGo(true);
    // } else {
    //   Alert.alert(
    //     'Erro ao autenticar',
    //   );
    // }
  };

  // Futuras Implementações
  // const [list, setList] = useState([]);

  // const listarBancos = async () => {
  //   setList([]);

  //   const res = await api.get('/banklist');
  //   if (res.status === 200) {
  //     console.log(res.data);
  //     // setGo(true);
  //     setList(res.data);
  //   } else {
  //     Alert.alert(
  //       'Erro ao buscar os bancos disponiveis',
  //     );
  //   }
  // };

  if (go === false) {
    return (
      <>
      <Container>
        <Title>
          Encontre crédito de acordo com seu perfil.
        </Title>
        <ConsenseText>
          Para que tenha uma melhor experiência em sua busca de crédito,
          recomendamos nos conceder acesso a sua conta para que possamos
          traçar um perfil e lhe recomendar as melhores instituições.
        </ConsenseText>
        <Button onPress={() => autenticar()} >
          CONCEDER ACESSO
        </Button>
        <NoConsenseText>
          Não Obrigado
        </NoConsenseText>
      </Container>
      </>
    );
  }
  return (
      // <ListArea>
      //   {list.map((item:Data) => (
      //     <Bank name={item.name} logo={item.logo}
      //     emprestimoPessoal={item.emprestimoPessoal}
      //     chequeEspecial={item.chequeEspecial} />
      //   ))};
      // </ListArea>
      <WebView
        source={{ uri: url }}
        style={{ marginTop: 20 }}
      />
  );
};

export default Main;
