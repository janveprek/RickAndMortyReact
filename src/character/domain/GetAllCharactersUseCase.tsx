import CharacterModel from "../model/CharacterModel";
import ResultWrapper from "../model/ResultWrapper";
import {CharacterRepository} from "./CharacterRepository";

export interface GetAllCharactersUseCase {
    execute(character: CharacterModel):  Promise<ResultWrapper<CharacterModel[]>>;
}

class GetAllCharactersUseCaseImpl implements GetAllCharactersUseCase {
    characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    async execute() {
        return await this.characterRepository.getAllCharacters(0);
    }
}

export default GetAllCharactersUseCaseImpl;