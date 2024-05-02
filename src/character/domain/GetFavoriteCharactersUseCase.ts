import CharacterModel from "../model/CharacterModel";
import {CharacterRepository} from "./CharacterRepository";

export interface GetFavoriteCharactersUseCase {
    execute(): Promise<CharacterModel[]>;
}

class GetFavoriteCharactersUseCaseImpl implements GetFavoriteCharactersUseCase {
    private repository: CharacterRepository;

    constructor(repository: CharacterRepository) {
        this.repository = repository;
    }

    async execute(): Promise<CharacterModel[]> {
        return this.repository.getFavouriteCharacters();
    }
}

export default GetFavoriteCharactersUseCaseImpl;