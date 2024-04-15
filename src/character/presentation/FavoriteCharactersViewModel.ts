import CharacterModel from "../model/CharacterModel";
import AddCharacterToFavoritesUseCaseImpl from "../domain/AddCharacterToFavoritesUseCaseImpl";
import {useEffect, useState} from "react";
import GetFavoriteCharactersUseCase from "../domain/GetFavoriteCharactersUseCase";
import RemoveCharacterFromFavoritesUseCase from "../domain/RemoveCharacterFromFavoritesUseCase";


interface FavoriteCharactersState {
    characters: CharacterModel[];
    isLoading: boolean;
    error?: string;
}

const initialState: FavoriteCharactersState = {
    characters: [],
    isLoading: true,
    error: undefined,
};


const FavoriteCharactersViewModel = (
        getFavoriteCharacters: GetFavoriteCharactersUseCase,
    addCharacterToFavorites: AddCharacterToFavoritesUseCaseImpl,
    removeCharacterFromFavorites: RemoveCharacterFromFavoritesUseCase
) => {
    const [charactersState, setCharactersState] = useState<FavoriteCharactersState>(initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const characters = await getFavoriteCharacters.execute();
                setCharactersState({ ...charactersState, characters, isLoading: false });
            } catch (error) {
                setCharactersState({ ...charactersState, isLoading: false, error: 'Failed to fetch characters' });
            }
        };

        fetchData();
    }, []);

    const toggleFavourite = async (character: CharacterModel) => {
        const updatedCharacters = charactersState.characters.map(char =>
            char.id === character.id ? { ...char, isFavourite: !char.isFavourite } : char
        );
        setCharactersState({ ...charactersState, characters: updatedCharacters });

        try {
            if (character.isFavourite) {
                await removeCharacterFromFavorites.execute(character);
            } else {
                await addCharacterToFavorites.execute(character);
            }
        } catch (error) {
        }
    };

    const search = async (query: string) => {
        setCharactersState({ ...charactersState, isLoading: true });

        try {
            const characters = await getFavoriteCharacters.execute();
            setCharactersState({ ...charactersState, characters, isLoading: false });
        } catch (error) {
            setCharactersState({ ...charactersState, isLoading: false, error: 'Failed to search characters' });
        }
    };

    return { charactersState, toggleFavourite, search };
};

export default FavoriteCharactersViewModel;