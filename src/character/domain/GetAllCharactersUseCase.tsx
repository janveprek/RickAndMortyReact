import ErrorResult from "../model/ErrorResult";
import SuccessResult from "../model/SuccessResult";
import CharacterRepositoryImpl from "../data/CharacterRepositoryImpl";

class GetAllCharactersUseCase {
    characterRepository: CharacterRepositoryImpl;

    constructor(characterRepository: CharacterRepositoryImpl) {
        this.characterRepository = characterRepository;
    }

    async execute() {
        const result = await this.characterRepository.getAllCharacters();
        return result;
    }
}

export default GetAllCharactersUseCase;