import React, {createContext} from 'react';
import CharacterApiImpl from "../system/CharacterApiImpl";
import CharacterRepositoryImpl from "./CharacterRepositoryImpl";
import CharacterRepositoryContext from "./CharacterRepositoryContext";

function CharacterRepositoryProvider({children}) {
    const characterRepository = new CharacterRepositoryImpl(new CharacterApiImpl());

    return (
        <CharacterRepositoryContext.Provider value={characterRepository}>
            {children}
        </CharacterRepositoryContext.Provider>
    );
}

export default CharacterRepositoryProvider;
