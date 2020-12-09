/* eslint-disable no-use-before-define */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../pages/Main';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <App.Navigator screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F3F3F3' },
    }}
    >
        <App.Screen name='Main' component={Main}/>
    </App.Navigator>
);

export default AuthRoutes;
