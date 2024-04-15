import React, {useContext} from 'react';
import {View, Image, StyleSheet, ScrollView, SafeAreaView, useColorScheme} from 'react-native';
import {paddingMedium, paddingSmall} from '../../../design/theme/styles';
import {CharacterRepositoryContext, i18n} from '../../../../App';
import GetCharacterByIdUseCase from "../../domain/GetCharacterByIdUseCase";
import {Divider, Text, useTheme} from "react-native-paper";
import CharacterDetailViewModel from "./CharacterDetailViewModel";
import ErrorScreen from "../../../design/components/ErrorScreen";
import LoadingScreen from "../../../design/components/LoadingScreen";
import {ErrorState, LoadingState, SuccessState} from "../../../design/model/ScreenState";
import {useNavigation} from "@react-navigation/native";
import TopBar from "../../../design/components/TopBar";
import {darkTheme, materialYouTheme} from "../../../design/theme/colors";

const avatarSizeInDp = 120;

type CharacterDetailScreenRouteParams = {
    id: number;
};

type CharacterDetailScreenRouteProp = {
    route: {
        params: CharacterDetailScreenRouteParams;
    };
};

const CharacterDetailScreen: React.FC<CharacterDetailScreenRouteProp> = ({route}) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const characterRepository = useContext(CharacterRepositoryContext);
    const {id} = route.params;
    const getCharacterById = new GetCharacterByIdUseCase(characterRepository);
    const viewModel = CharacterDetailViewModel(id, getCharacterById);

    return (
        <SafeAreaView  style={{flex: 1, backgroundColor:theme.colors.surface}}>
            <TopBar navigation={navigation} character={viewModel.characterState.character} />
            {(() => {
                switch (viewModel.characterState.state) {
                    case LoadingState:
                        return <LoadingScreen/>;
                    case ErrorState:
                        return <ErrorScreen tryAgain={getCharacterById.execute(id)}/>;
                    case SuccessState:
                        // return <View style={{ backgroundColor: theme.colors.secondary }} />;
                        return <CharacterDetailScreenContent character={viewModel.characterState.character}/>;
                }
            })()}
        </SafeAreaView>);

};

const CharacterDetailScreenContent = ({character}) => {
    return (
        <ScrollView style={styles.container}>
            <Header name={character.name} iconUrl={character.iconUrl}/>
            <Divider style={styles.divider}/>
            <InfoPair title={i18n.t('status')} value={character.status}/>
            <InfoPair title={i18n.t('species')} value={character.species}/>
            <InfoPair title={i18n.t('type')} value={character.type}/>
            <InfoPair title={i18n.t('gender')} value={character.gender}/>
            <InfoPair title={i18n.t('origin')} value={character.origin}/>
            <InfoPair title={i18n.t('location')} value={character.location}/>
        </ScrollView>
    );
};

const Header = ({name, iconUrl}) => (
    <View style={styles.headerContainer}>
        <Image source={{uri: iconUrl}} resizeMode="contain" style={styles.avatar}/>
        <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Name</Text>
            <Text style={styles.headerName}>{name}</Text>
        </View>
    </View>
);

const InfoPair = ({title, value}) => (
    <View style={styles.infoPairContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: paddingSmall,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: avatarSizeInDp,
        height: avatarSizeInDp,
        borderRadius: paddingSmall
    },
    headerTextContainer: {
        paddingHorizontal: paddingMedium
    },
    headerTitle: {},
    headerName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoPairContainer: {
        paddingVertical: paddingSmall,
        paddingHorizontal: paddingMedium,
    },
    infoTitle: {},
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        marginVertical: paddingSmall,
        backgroundColor: '#000000',
    },
});

export default CharacterDetailScreen;