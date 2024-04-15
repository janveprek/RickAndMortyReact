import CharacterModel from "../model/CharacterModel";
import ResultWrapper from "../model/ResultWrapper";
import CharacterDetail from "../model/CharacterDetail";
import StatusFilter from "../model/Filter";

abstract class CharacterRepository {
    abstract getAllCharacters(page: number): Promise<ResultWrapper<CharacterModel[]>>;

    abstract getCharactersByName(name: string, filter: StatusFilter): Promise<ResultWrapper<CharacterModel[]>>;

    abstract getFavouriteCharacters(): Promise<CharacterModel[]>;

    abstract addCharacterToFavorites(character: CharacterModel): Promise<void>;

    abstract removeCharacterFromFavourites(character: CharacterModel): Promise<void>;

    abstract getCharacterById(id: number): Promise<ResultWrapper<CharacterDetail>>;
}

export default CharacterRepository;