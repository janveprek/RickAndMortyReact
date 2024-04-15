import * as SQLite from "expo-sqlite";
import CharacterModel from "../model/CharacterModel";
import CharacterDatabase from "./CharacterDb";
import {Platform} from "react-native";

let db = null;

if (Platform.OS !== 'web') {
    db = SQLite.openDatabase('characters.db');
} else {
    console.log('SQLite database is not supported in web browser environment.');
}
class SQLiteCharacterDatabase implements CharacterDatabase {
    private charactersTableName: string;

    constructor() {
        this.charactersTableName = 'Character';
        if (Platform.OS !== 'web') {
            this.initDB();
        }
    }

    public initDB = async (): Promise<SQLite.SQLTransaction> => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS Character (id INTEGER PRIMARY KEY, name TEXT, status TEXT, imageUrl TEXT, isFavourite INTEGER);',
                        [],
                        () => resolve(tx),
                    );
                },
                error => reject(error)
            );
        });
    };

    public getFavouriteCharacters = async (): Promise<CharacterModel[]> => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        `SELECT * FROM ${this.charactersTableName};`,
                        [],
                        (_, { rows }) => {
                            const characters: CharacterModel[] = [];
                            for (let i = 0; i < rows.length; i++) {
                                characters.push(rows.item(i));
                            }
                            resolve(characters);
                        },
                    );
                },
                error => reject(error)
            );
        });
    };

    public getFavouriteCharacterByName = async (name: string): Promise<CharacterModel | null> => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT * FROM Character WHERE name = ?;',
                        [name],
                        (_, { rows }) => {
                            if (rows.length > 0) {
                                resolve(rows.item(0));
                            } else {
                                resolve(null);
                            }
                        },
                    );
                },
                error => reject(error)
            );
        });
    };


    public addCharacterToFavourites = async (character: CharacterModel): Promise<void> => {
        console.log('adding character');
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'INSERT INTO Character (id, name, status, imageUrl, isFavourite) VALUES (?, ?, ?, ?, ?);',
                        [character.id, character.name, character.status, character.iconUrl, character.isFavourite ? 1 : 0],
                        (_, { rowsAffected }) => {
                            if (rowsAffected > 0) {
                                resolve();
                            } else {
                                reject(new Error('Failed to add character'));
                            }
                        },
                    );
                },
                error => reject(error)
            );
        });
    };

    public removeCharacterFromFavourites = async (character: CharacterModel): Promise<void> => {
        const id = character.id;
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'DELETE FROM Character WHERE id = ?;',
                        [id],
                        (_, { rowsAffected }) => {
                            if (rowsAffected > 0) {
                                resolve();
                            } else {
                                reject(new Error('Character not found'));
                            }
                        },
                    );
                },
                error => reject(error)
            );
        });
    };
}

export default SQLiteCharacterDatabase;