import * as React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, AddScreen} from './component';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={({ route }) => ({ title: route?.params?.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
