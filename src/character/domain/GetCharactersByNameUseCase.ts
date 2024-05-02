import ResultWrapper from "../model/ResultWrapper";
import CharacterModel from "../model/CharacterModel";
import StatusFilter from "../model/Filter";
import {CharacterRepository} from "./CharacterRepository";

export interface GetCharactersByNameUseCase {
    execute(name: string, filter?: StatusFilter): Promise<ResultWrapper<CharacterModel[]>>;
}

class GetCharactersByNameUseCaseImpl implements GetCharactersByNameUseCase {
    private repository: CharacterRepository;

    constructor(repository: CharacterRepository) {
        this.repository = repository;
    }

    // Implement the call method of GetCharactersByNameUseCase interface
    async execute(name: string, filter: StatusFilter = StatusFilter.All): Promise<ResultWrapper<CharacterModel[]>> {
        return this.repository.getCharactersByName(name, filter);
    }
}

export default GetCharactersByNameUseCaseImpl;