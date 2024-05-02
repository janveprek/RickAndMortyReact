import CharacterModel from "../model/CharacterModel";
import ResultWrapper from "../model/ResultWrapper";
import CharacterDetail from "../model/CharacterDetail";
import StatusFilter from "../model/Filter";

export interface CharacterRepository {
    getAllCharacters(page: number): Promise<ResultWrapper<CharacterModel[]>>;

    getCharactersByName(name: string, filter: StatusFilter): Promise<ResultWrapper<CharacterModel[]>>;

    getFavouriteCharacters(): Promise<CharacterModel[]>;

    addCharacterToFavorites(character: CharacterModel): Promise<void>;

    removeCharacterFromFavourites(character: CharacterModel): Promise<void>;

    getCharacterById(id: number): Promise<ResultWrapper<CharacterDetail>>;
}
