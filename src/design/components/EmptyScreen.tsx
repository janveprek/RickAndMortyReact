import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {iconSizeLarge, paddingSmall} from "../theme/styles";
import ActiveIcon from "./ActiveIcon";


const EmptyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                There's nothing here!
            </Text>
            <View style={styles.icon}>
                <ActiveIcon/>
            </View>

            <Text style={styles.bodyText}>
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
    titleText: {
        textAlign: 'center',
    },
    icon: {
        alignSelf: 'center',
        alignContent: 'center',
        width: 120,
        height: 120,
    },
    bodyText: {
        textAlign: 'center',
        paddingHorizontal: paddingSmall,
    },
});

export default EmptyScreen;
