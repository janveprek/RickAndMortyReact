import React, {createContext, useMemo} from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import Navigation from "./src/navigation/system/NavigationContainter";

// const Stack = createStackNavigator();

import CharacterRepositoryImpl from "./src/character/data/CharacterRepositoryImpl";
import CharacterApiImpl from "./src/character/system/CharacterApiImpl";
import SQLiteCharacterDatabase from "./src/character/data/SQLiteCharacterDatabase";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as RNLocalize from "expo-localization";
import {I18n} from "i18n-js";
import {useMaterial3Theme} from "@pchmn/expo-material3-theme";

export const characterRepository = new CharacterRepositoryImpl(new CharacterApiImpl(), new SQLiteCharacterDatabase());
export const CharacterRepositoryContext = createContext(null);

const translations = {
    en: require('./src/locales/en.json'),
    cs: require('./src/locales/cs.json')
};

const i18n = new I18n(translations);
i18n.translations = translations;
i18n.locale = RNLocalize.getLocales()[0].languageCode;
i18n.fallbacks = true;

export default function Main() {
    const colorScheme = useColorScheme();
    const {theme} = useMaterial3Theme({sourceColor: "#546524"});
    const paperTheme = useMemo(
        () =>
            colorScheme === 'dark' ? {...MD3DarkTheme, colors: theme.dark} : {...MD3LightTheme, colors: theme.light},
        [colorScheme, theme]
    );

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider theme={paperTheme}>
                <CharacterRepositoryContext.Provider value={characterRepository}>
                    <Navigation></Navigation>
                </CharacterRepositoryContext.Provider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}

export {i18n};
