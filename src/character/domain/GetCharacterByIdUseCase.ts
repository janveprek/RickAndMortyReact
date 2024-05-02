import CharacterRepositoryImpl from "../data/CharacterRepositoryImpl";
import CharacterDetail from "../model/CharacterDetail";
import ResultWrapper from "../model/ResultWrapper";
import CharacterModel from "../model/CharacterModel";
import {CharacterRepository} from "./CharacterRepository";

export interface GetCharacterByIdUseCase {
    execute(id: number):  Promise<ResultWrapper<CharacterDetail>>;
}
class GetCharacterByIdUseCaseImpl implements GetCharacterByIdUseCase {
    characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    async execute(id: number): Promise<ResultWrapper<CharacterDetail>> {
        return await this.characterRepository.getCharacterById(id);
    }
}

export default GetCharacterByIdUseCaseImpl;