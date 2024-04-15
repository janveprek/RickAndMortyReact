import {NavigationContainer} from "@react-navigation/native";
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppContainer from "../../../.expo/metro/shims/react-native-web/dist/exports/AppRegistry/AppContainer";
import {cornerRadiusSmall, paddingSmall} from "../../design/theme/styles";
import {Image, Text, View} from "react-native";
import CharacterListScreen from "../../character/presentation/CharacterListScreen";
import CharacterDetailScreen from "../../character/presentation/detail/CharacterDetailScreen";

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName="Home"
                                 screenOptions={{
                                     header: ({navigation, route, options}) => null,
                                 }}>
                    <Stack.Screen name="Home" component={CharacterListScreen}/>
                    <Stack.Screen name="Character" component={CharacterDetailScreen}/>
                </Stack.Navigator>
        </NavigationContainer>
    )
};
export default Navigation;