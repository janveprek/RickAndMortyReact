import CharacterModel from "../model/CharacterModel";
import {CharacterRepository} from "./CharacterRepository";

interface AddCharacterToFavoritesUseCase {
    execute(character: CharacterModel): Promise<void>;
}

class AddCharacterToFavoritesUseCaseImpl implements AddCharacterToFavoritesUseCase {
    private repository: CharacterRepository;

    constructor(repository: CharacterRepository) {
        this.repository = repository;
    }

    async execute(character: CharacterModel): Promise<void> {
        await this.repository.addCharacterToFavorites(character);
    }
}

export default AddCharacterToFavoritesUseCaseImpl;