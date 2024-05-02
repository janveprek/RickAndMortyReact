import ResultWrapper from "../../../src/character/model/ResultWrapper";
import CharacterModel from "../../../src/character/model/CharacterModel";
import CharacterDetail from "../../../src/character/model/CharacterDetail";
import StatusFilter from "../../../src/character/model/Filter";
import AddCharacterToFavoritesUseCaseImpl from "../../../src/character/domain/AddCharacterToFavoritesUseCaseImpl";
import CharacterRepositoryImpl from "../../../src/character/data/CharacterRepositoryImpl";
import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import GetAllCharactersUseCaseImpl from "../../../src/character/domain/GetAllCharactersUseCase";

describe('GetAllCharactersUseCaseImplTest', () => {
    it('should call getAllCharacters once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharactersByName: jest.fn(),
            getFavouriteCharacters: jest.fn(),
            removeCharacterFromFavourites: jest.fn(),
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new GetAllCharactersUseCaseImpl(mockRepository);

        await useCase.execute();
        expect(mockRepository.getAllCharacters).toHaveBeenCalledTimes(1);
        expect(mockRepository.getAllCharacters).toHaveBeenCalledWith(0);
    });
});