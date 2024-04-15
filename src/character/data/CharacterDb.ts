import * as SQLite from 'expo-sqlite';
import CharacterModel from "../model/CharacterModel";


abstract class CharacterDatabase {
    abstract initDB(): Promise<SQLite.SQLTransaction>;
    abstract getFavouriteCharacters(): Promise<CharacterModel[]>;
    abstract getFavouriteCharacterByName(name: string): Promise<CharacterModel | null>;
    abstract addCharacterToFavourites(character: CharacterModel): Promise<void>;
    abstract removeCharacterFromFavourites(character: CharacterModel): Promise<void>;
}

export default CharacterDatabase;