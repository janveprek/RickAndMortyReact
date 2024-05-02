import CharacterModel from "../model/CharacterModel";
import {CharacterRepository} from "./CharacterRepository";

export interface RemoveCharacterFromFavoritesUseCase {
    execute(character: CharacterModel): Promise<void>;
}

class RemoveCharacterFromFavoritesUseCaseImpl implements RemoveCharacterFromFavoritesUseCase {
    private repository: CharacterRepository;

    constructor(repository: CharacterRepository) {
        this.repository = repository;
    }

    async execute(character: CharacterModel): Promise<void> {
        await this.repository.removeCharacterFromFavourites(character);
    }
}

export default RemoveCharacterFromFavoritesUseCaseImpl;