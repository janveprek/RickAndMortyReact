import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import ErrorFaceIcon from "./ErrorFaceIcon";
import {paddingExtraLarge, paddingLarge} from "../theme/styles";
const ErrorScreen = ({tryAgain}) => {
    const theme = useTheme();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: paddingLarge, backgroundColor:theme.colors.surface}}>
            <Text style={[styles.title, {margin: paddingLarge}]}>Something went wrong</Text>

            <ErrorFaceIcon color={theme.colors.primary} size={72}/>

            <Text style={[styles.description, {margin: paddingLarge}]}>
                Please check your internet connection and try again later.
            </Text>
            <Button textColor={theme.colors.onPrimaryContainer} buttonColor={theme.colors.primaryContainer} style={{ width: '100%', marginTop: paddingExtraLarge }} onPress={tryAgain}>
                Try Again
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22,
    },
    button: {
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    iconContainer: {
        // Style for icon container
        marginBottom: 20,
    },
});

export default ErrorScreen;