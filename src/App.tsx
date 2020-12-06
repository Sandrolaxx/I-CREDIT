import 'react-native-gesture-handler';
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
);

export default App;
