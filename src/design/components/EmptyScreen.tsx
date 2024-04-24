import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {iconSizeLarge, paddingLarge} from "../theme/styles";
import {useTheme} from "react-native-paper";
import ErrorFaceIcon from "./ErrorFaceIcon";


const EmptyScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {margin: paddingLarge}]}>
                There's nothing here!
            </Text>
            <ErrorFaceIcon color={theme.colors.primary} size={iconSizeLarge}/>

            <Text style={[styles.description, {margin: paddingLarge}]}>
                Add some characters to favorites
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 20,
        marginTop: 20,
    },
    icon: {
        alignSelf: 'center',
        alignContent: 'center',
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22,
        marginBottom: 20,
        marginTop: 20,
    },
});

export default EmptyScreen;
