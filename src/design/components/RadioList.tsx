import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import StatusFilter from "../../character/model/Filter";

const RadioList = ({options, selectedOption, onSelect}) => {
    const renderItem = ({item}) => (
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <RadioButton
                value={item}
                status={selectedOption === item ? 'checked' : 'unchecked'}
                onPress={() => onSelect(item)}
            />
            <Text>{StatusFilter.getName(item)}</Text>
        </View>
    );

    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
        />
    );
};

export default RadioList;