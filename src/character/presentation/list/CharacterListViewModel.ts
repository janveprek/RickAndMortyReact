import {useState, useEffect} from 'react';
import CharacterModel from "../../model/CharacterModel";
import GetAllCharactersUseCase from "../../domain/GetAllCharactersUseCase";
import RemoveCharacterFromFavoritesUseCase from "../../domain/RemoveCharacterFromFavoritesUseCase";
import AddCharacterToFavoritesUseCaseImpl from "../../domain/AddCharacterToFavoritesUseCaseImpl";
import SuccessResult from "../../model/SuccessResult";
import GetCharactersByNameUseCaseImpl from "../../domain/GetCharactersByNameUseCase";
import GetFavoriteCharactersUseCaseImpl from "../../domain/GetFavoriteCharactersUseCase";
import {EmptyState, ErrorState, SuccessState} from "../../../design/model/ScreenState";
import {LoadingState} from "../../../design/model/ScreenState";
import {CharactersListState} from "./state/CharacterListState";
import StatusFilter from "../../model/Filter";

const initialState: CharactersListState = {
    characters: [],
    favorites: [],
    screenState: LoadingState,
    query: "",
    appliedFilter: StatusFilter.All
};

const CharactersListViewModel = (
    getAllCharacters: GetAllCharactersUseCase,
    getCharactersByName: GetCharactersByNameUseCaseImpl,
    getFavoriteCharacters: GetFavoriteCharactersUseCaseImpl,
    addCharacterToFavorites: AddCharacterToFavoritesUseCaseImpl,
    removeCharacterFromFavorites: RemoveCharacterFromFavoritesUseCase
) => {
    const [charactersState, setCharactersState] = useState<CharactersListState>(initialState);

    useEffect(() => {
        const updateCharacters = async () => {
            setCharactersState({...charactersState, screenState: LoadingState});
            const result = await getAllCharacters.execute();
            const favorites = await getFavoriteCharacters.execute();
            if (result instanceof SuccessResult) {
                const characters = result.value
                if (characters.length > 0) {
                    setCharactersState({
                        ...charactersState,
                        screenState: SuccessState,
                        characters: characters,
                        favorites: favorites
                    });
                } else {
                    setCharactersState({
                        ...charactersState,
                        screenState: EmptyState,
                        characters: characters,
                        favorites: favorites
                    });
                }
            } else {
                setCharactersState({...charactersState, screenState: ErrorState});
            }
        };

        updateCharacters();
    }, []);

    const getCharacters = async () => {
        setCharactersState({...charactersState, screenState: LoadingState});
        const result = await getAllCharacters.execute();
        const favorites = await getFavoriteCharacters.execute();
        if (result instanceof SuccessResult) {
            const characters = result.value
            if (characters.length > 0) {
                setCharactersState({
                    ...charactersState,
                    screenState: SuccessState,
                    characters: characters,
                    favorites: favorites
                });
            } else {
                setCharactersState({
                    ...charactersState,
                    screenState: EmptyState,
                    characters: characters,
                    favorites: favorites
                });
            }
        } else {
            setCharactersState({...charactersState, screenState: ErrorState});
        }
    };

    const toggleFavourite = async (character: CharacterModel) => {
        const updatedCharacters = charactersState.characters.map(char =>
            char.id === character.id ? {...char, isFavourite: !char.isFavourite} : char
        );
        setCharactersState({
            ...charactersState,
            characters: updatedCharacters,
            favorites: updatedCharacters.filter(ch => ch.isFavourite)
        });

        if (character.isFavourite) {
            await removeCharacterFromFavorites.execute(character);
        } else {
            await addCharacterToFavorites.execute(character);
        }
    };

    const search = async (query: string, filter: StatusFilter = StatusFilter.All) => {
        setCharactersState({...charactersState, query: query, screenState: LoadingState});
        console.log(`Filter: ${charactersState.appliedFilter}, query: ${charactersState.query} `);

        const result = await getCharactersByName.execute(query, filter);
        if (result instanceof SuccessResult) {
            const characters = result.value;
            console.log(`character: ${characters}`);
            if (characters.length > 0) {
                setCharactersState({
                    ...charactersState,
                    screenState: SuccessState,
                    characters: characters,
                    favorites: characters.filter((c: CharacterModel) => c.isFavourite)
                });
            } else {
                setCharactersState({
                    ...charactersState,
                    screenState: EmptyState,
                    characters: characters,
                    favorites: characters.filter((c: CharacterModel) => c.isFavourite)
                });
            }
        } else {
            setCharactersState({...charactersState, screenState: ErrorState});
        }
    };

    const applyFilter = (filter: StatusFilter) => {
        setCharactersState(prevState => ({
            ...prevState,
            appliedFilter: filter
        }));
        search(charactersState.query, charactersState.appliedFilter);
        console.log(`applyFilter: ${filter} ${charactersState.appliedFilter}, query: ${charactersState.query} `);
    }

    return {charactersState, toggleFavourite, search, getCharacters, applyFilter};
};

export default CharactersListViewModel;
