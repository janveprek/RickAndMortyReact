import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';

export default function TopBar({navigation, character}) {
    const theme = useTheme();

    return (
        <Appbar.Header style={[
            {
                backgroundColor: theme.colors.surface,
            },
        ]}>
            <Appbar.BackAction onPress={navigation.goBack}/>
            <Appbar.Content title={character ? character.name : ''}/>
        </Appbar.Header>
    );
}