import CharacterApi from "./CharacterApi";
import SuccessResult from "../model/SuccessResult";
import ErrorResult from "../model/ErrorResult";
import ResultWrapper from "../model/ResultWrapper";
import CharacterModel from "../model/CharacterModel";
import CharacterDatabase from "./CharacterDb";
import {Platform} from "react-native";
import StatusFilter from "../model/Filter";
import {CharacterRepository} from "../domain/CharacterRepository";
import characterDb from "./CharacterDb";

class CharacterRepositoryImpl implements CharacterRepository {
    charactersApi: CharacterApi;
    charactersDatabase: CharacterDatabase;
    favoriteCharacters: CharacterModel[];


    constructor(charactersApi: CharacterApi, charactersDatabase: CharacterDatabase) {
        this.charactersApi = charactersApi;
        this.charactersDatabase = charactersDatabase;
        this.favoriteCharacters = [];
    }

    async getAllCharacters(page: number = 1): Promise<ResultWrapper<CharacterModel[]>> {
        try {
            const result = await this.charactersApi.getAllCharacters(page);
            let characters = result.toModel().data;
            const favourites = await this.getFavouriteCharacters();

            characters = characters.map(char =>
                favourites.some(fav => fav.id === char.id)
                    ? {...char, isFavourite: true}
                    : char
            );

            return new SuccessResult(characters);
        } catch (e) {
            return new ErrorResult(e);
        }
    }

    async getCharactersByName(name: string, filter: StatusFilter = StatusFilter.All): Promise<ResultWrapper<CharacterModel[]>> {
        try {
            const characters = await this.charactersApi.getCharactersByName(name, filter).then(result => result.toModel().data);
            const favourites = await this.getFavouriteCharacters();
            const updatedCharacters = characters.map(char => {
                const isFavourite = favourites.some(fav => fav.id === char.id);
                return {...char, isFavourite};
            });
            return new SuccessResult(updatedCharacters);
        } catch (error) {
            return new ErrorResult(error);
        }
    }

    async getCharacterById(id: number): Promise<ResultWrapper<CharacterModel>> {
        try {
            const result = await this.charactersApi.getCharacterById(id);
            const favourites = await this.getFavouriteCharacters();
            let character = result.toModel();
            if (favourites.some((fav) => fav.id === id)) {
                character = { ...character, isFavourite: true };
            }
            return new SuccessResult(character);
        } catch (e) {
            return new ErrorResult(e);
        }
    }


    public async getFavouriteCharacters(): Promise<CharacterModel[]> {
        if (Platform.OS === 'web') {
            return this.favoriteCharacters;
        } else {
            return this.charactersDatabase.getFavouriteCharacters();
        }
    }

    public async addCharacterToFavorites(character: CharacterModel): Promise<void> {
        if (Platform.OS === 'web') {
            this.favoriteCharacters.push(character);
        } else {
            return this.charactersDatabase.addCharacterToFavourites(character);
        }
    }

    public async removeCharacterFromFavourites(character: CharacterModel): Promise<void> {
        if (Platform.OS === 'web') {
            this.favoriteCharacters = this.favoriteCharacters.filter(fav => fav.id !== character.id);
        } else {
            return this.charactersDatabase.removeCharacterFromFavourites(character);
        }
    }
}

export default CharacterRepositoryImpl;
