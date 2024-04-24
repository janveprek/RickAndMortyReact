// HomeScreen.js
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {
    Appbar,
    BottomNavigation,
    Button,
    Text,
    Searchbar,
    IconButton,
} from 'react-native-paper';
import CharacterCard from "../../design/components/CharacterCard";
import {paddingMedium, paddingSmall} from "../../design/theme/styles";
import CharacterModel from "../model/CharacterModel";
import GetAllCharactersUseCase from "../domain/GetAllCharactersUseCase";
import {CharacterRepositoryContext, i18n} from '../../../App';
import CharacterListViewModel from "./list/CharacterListViewModel";
import GetCharactersByNameUseCaseImpl from "../domain/GetCharactersByNameUseCase";
import AddCharacterToFavoritesUseCaseImpl from "../domain/AddCharacterToFavoritesUseCaseImpl";
import RemoveCharacterFromFavoritesUseCaseImpl from "../domain/RemoveCharacterFromFavoritesUseCase";
import GetFavoriteCharactersUseCaseImpl from "../domain/GetFavoriteCharactersUseCase";
import EmptyScreen from "../../design/components/EmptyScreen";
import LoadingScreen from "../../design/components/LoadingScreen";
import ErrorScreen from "../../design/components/ErrorScreen";
import {ErrorState, LoadingState, SuccessState} from "../../design/model/ScreenState";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import RadioList from "../../design/components/RadioList";
import StatusFilter from "../model/Filter";

const AllRoute = ({state, characters, tryAgain, onClick, onLongClick}) => {
    return CharacterList({state, characters, tryAgain, onClick, onLongClick})
};

const FavoriteRoute = ({state, characters, tryAgain, onClick, onLongClick}) => {
    return CharacterList({state, characters, tryAgain, onClick, onLongClick})
};

const CharacterListScreen = ({navigation}) => {
    const characterRepository = useContext(CharacterRepositoryContext);
    const viewModel = CharacterListViewModel(new GetAllCharactersUseCase(characterRepository), new GetCharactersByNameUseCaseImpl(characterRepository), new GetFavoriteCharactersUseCaseImpl(characterRepository), new AddCharacterToFavoritesUseCaseImpl(characterRepository), new RemoveCharacterFromFavoritesUseCaseImpl(characterRepository));
    const bottomSheetRef = useRef(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        {key: 'all', title: i18n.t('bottom_bar_characters'), focusedIcon: require('../../../assets/ic_all_characters.png')},
        {key: 'favorite', title: i18n.t('bottom_bar_favourites'), focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = React.useState(StatusFilter.All);

    useEffect(() => {
        viewModel.search(searchQuery, filter);
    }, [searchQuery, filter]);

    const onClick = (id) => {
        navigation.navigate('Character', {id});
    };

    const renderScene = ({route}) => {
        switch (route.key) {
            case 'all':
                return <AllRoute state={viewModel.charactersState.screenState}
                                 characters={viewModel.charactersState.characters}
                                 tryAgain={viewModel.getCharacters}
                                 onClick={onClick}
                                 onLongClick={viewModel.toggleFavourite}
                />;
            case 'favorite':
                return <FavoriteRoute state={viewModel.charactersState.screenState}
                                      characters={viewModel.charactersState.favorites}
                                      tryAgain={viewModel.getCharacters}
                                      onClick={onClick}
                                      onLongClick={viewModel.toggleFavourite}/>;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <Searchbar
                        style={[
                            styles.searchbar,
                        ]
                        }
                        placeholder="Search characters"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                    <IconButton
                        icon="tune"
                        iconColor={"#000"}
                        onPress={handlePresentModalPress}
                        style={{width: 48, height: 48}}
                    />
                </View>
            </Appbar.Header>
            <BottomNavigation
                navigationState={{index, routes}}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
            <BottomSheet filter={filter} setFilter={setFilter} innerRef={bottomSheetRef}
                         onSubmit={viewModel.applyFilter}/>
        </SafeAreaView>
    );
};


const BottomSheet = ({innerRef, onSubmit, filter, setFilter}) => {

    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const handleSubmitModalPress = useCallback(() => {
        innerRef.current?.close();
        onSubmit(filter);
    }, [filter, onSubmit, innerRef]);
    const options = [StatusFilter.All, StatusFilter.Unknown, StatusFilter.Alive, StatusFilter.Dead];

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={innerRef}
                index={1}
                snapPoints={snapPoints}>
                <BottomSheetView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text variant="titleLarge">Status</Text>
                    <RadioList
                        options={options}
                        selectedOption={filter}
                        onSelect={setFilter}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Button onPress={handleSubmitModalPress}>
                            Submit
                        </Button>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}


const CharacterList = ({state, characters, tryAgain, onClick, onLongClick}) => {
    switch (state) {
        case LoadingState:
            return <LoadingScreen/>;
        case ErrorState:
            return <ErrorScreen tryAgain={tryAgain}/>;
        case SuccessState:
            if (characters.length === 0) {
                return <EmptyScreen/>
            } else {
                return <FlatList
                    style={{paddingHorizontal: paddingSmall}}
                    data={characters}
                    renderItem={({item}) => (
                        <CharacterItem item={item} onClick={() => onClick(item.id)}
                                       onLongClick={() => onLongClick(item)}/>
                    )}
                    keyExtractor={character => character.id.toString()}
                />
            }
    }
};

const CharacterItem = ({item, onClick, onLongClick}) => (
    <View style={{marginVertical: paddingSmall}}>
        <CharacterCard
            character={item}
            onCharacterClick={(id: string) => onClick(id)}
            onCharacterLongClick={(character: CharacterModel) => onLongClick(character)}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    searchbar: {
        flex: 1,
        marginHorizontal: paddingSmall,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: paddingMedium,
    },
});

export default CharacterListScreen;
