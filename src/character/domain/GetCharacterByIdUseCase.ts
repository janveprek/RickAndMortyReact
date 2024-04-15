import CharacterRepositoryImpl from "../data/CharacterRepositoryImpl";
import CharacterDetail from "../model/CharacterDetail";
import ResultWrapper from "../model/ResultWrapper";

class GetCharacterByIdUseCase {
    characterRepository: CharacterRepositoryImpl;

    constructor(characterRepository: CharacterRepositoryImpl) {
        this.characterRepository = characterRepository;
    }

    async execute(id: number): Promise<ResultWrapper<CharacterDetail>> {
        return await this.characterRepository.getCharacterById(id);
    }
}

export default GetCharacterByIdUseCase;