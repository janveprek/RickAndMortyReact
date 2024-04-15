import AsyncStorage from '@react-native-async-storage/async-storage';
import CharacterApi from "./CharacterApi";
import CharacterDatabase from "./CharacterDb";
import ResultWrapper from "../model/ResultWrapper";
import SuccessResult from "../model/SuccessResult";
import ErrorResult from "../model/ErrorResult";
//
// class AsyncStorageCharacterRepository {
//     charactersApi: CharacterApi;
//     favoriteCharactersKey: string;
//     constructor(charactersApi) {
//         this.charactersApi = charactersApi;
//         this.favoriteCharactersKey = 'favoriteCharacters';
//     }
//
//     async getAllCharacters(page) {
//         try {
//             const characters = await this.charactersApi.getAllCharacters(page);
//             return SuccessResult(characters.map(character => character.toModel()));
//         } catch (ex) {
//             return ResultWrapper.Error(ex);
//         }
//     }
//
//     async getCharactersByName(name, filter) {
//         try {
//             const characters = await this.charactersApi.getCharactersByName(name, filter);
//             return new SuccessResult(characters.map(character => character.toModel()));
//         } catch (ex) {
//             return new ErrorResult(ex);
//         }
//     }
//
//     async getFavouriteCharacters() {
//         try {
//             const storedCharacters = await AsyncStorage.getItem(this.favoriteCharactersKey);
//             return storedCharacters ? JSON.parse(storedCharacters) : [];
//         } catch (ex) {
//             console.error('Error getting favorite characters from AsyncStorage:', ex);
//             return [];
//         }
//     }
//
//     async addCharacterToFavourites(character) {
//         try {
//             let favoriteCharacters = await this.getFavouriteCharacters();
//             favoriteCharacters.push(character);
//             await AsyncStorage.setItem(this.favoriteCharactersKey, JSON.stringify(favoriteCharacters));
//         } catch (ex) {
//             console.error('Error adding character to favorites:', ex);
//         }
//     }
//
//     async removeCharacterFromFavourites(character) {
//         try {
//             let favoriteCharacters = await this.getFavouriteCharacters();
//             favoriteCharacters = favoriteCharacters.filter(favorite => favorite.id !== character.id);
//             await AsyncStorage.setItem(this.favoriteCharactersKey, JSON.stringify(favoriteCharacters));
//         } catch (ex) {
//             console.error('Error removing character from favorites:', ex);
//         }
//     }
//
//     async getCharacterById(id) {
//         try {
//             const character = await this.charactersApi.getCharacterById(id);
//             return new SuccessResult(character.toModel());
//         } catch (ex) {
//             return new ErrorResult(ex);
//         }
//     }
// }
