import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from "react-native-paper";
import {iconSizeMedium, iconSizeSmall} from "../theme/styles";

const FavouriteIcon = ({ isFavourite, onClick }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <Icon
          name={isFavourite ? 'favorite' : 'favorite-border'}
          size={iconSizeSmall}
          color={theme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 50, // Creates a circular shape
    backgroundColor: 'transparent', // Use a transparent background
  },
});

export default FavouriteIcon;