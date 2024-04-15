import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import {
    paddingSmall,
    cardHeight,
    cornerRadiusSmall, cornerRadiusMedium, iconSizeMedium, iconSizeLarge,
} from '../theme/styles.js';
import FavouriteIcon from './FavouriteIcon.js';

const CharacterCard = ({character, onCharacterClick, onCharacterLongClick}) => {
    const theme = useTheme();
    const handleTap = () => {
        console.log('onCharacterClick');
        onCharacterClick(character.id);
    };

    const handleLongPress = () => {
        onCharacterLongClick(character);
    };

    return (
        <Card onPress={handleTap}  onLongPress={handleLongPress} style={styles.card}>
            <View style={styles.row}>
                <Image
                    source={{uri: character.iconUrl}}
                    style={styles.image}
                />
                <View style={styles.column}>
                    <Text style={{ color: theme.colors.onSurface }}>{character.name}</Text>
                    <Text style={{ color: theme.colors.onSurface }}>{character.status}</Text>
                </View>
                <FavouriteIcon
                    isFavourite={character.isFavourite}
                    onClick={handleLongPress}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        height: cardHeight,
        borderRadius: cornerRadiusMedium,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: paddingSmall,
    },
    image: {
        width: iconSizeLarge,
        height: iconSizeLarge,
        borderRadius: cornerRadiusSmall,
    },
    column: {
        flex: 1,
        paddingHorizontal: paddingSmall,
    },
});

export default CharacterCard;
