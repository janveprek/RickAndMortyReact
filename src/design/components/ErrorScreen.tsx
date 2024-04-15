import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";

const ErrorScreen = ({tryAgain}) => {
    const theme = useTheme();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor:theme.colors.surface}}>
            <Text style={styles.title}>Something went wrong</Text>
            <Icon
                icon="alert-circle"
                size={48}
                color="#FF0000"
                onPress={() => {
                }}
            />
            <Text style={styles.description}>
                Please check your internet connection and try again later.
            </Text>
            <Button textColor={theme.colors.onPrimaryContainer} buttonColor={theme.colors.primaryContainer} style={{ width: '100%' }} onPress={tryAgain}>
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
        marginBottom: 20,
        marginTop: 20,
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22,
        marginBottom: 20,
        marginTop: 20,
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