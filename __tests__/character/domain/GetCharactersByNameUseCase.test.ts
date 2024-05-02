import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import GetCharacterByIdUseCaseImpl from "../../../src/character/domain/GetCharacterByIdUseCase";
import GetCharactersByNameUseCaseImpl from "../../../src/character/domain/GetCharactersByNameUseCase";
import StatusFilter from "../../../src/character/model/Filter";

describe('GetCharacterByNameUseCaseImplTest', () => {
    it('should call getCharactersByName once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharactersByName: jest.fn(),
            getFavouriteCharacters: jest.fn(),
            removeCharacterFromFavourites: jest.fn(),
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new GetCharactersByNameUseCaseImpl(mockRepository);

        await useCase.execute("name");
        expect(mockRepository.getCharactersByName).toHaveBeenCalledTimes(1);
        expect(mockRepository.getCharactersByName).toHaveBeenCalledWith("name", StatusFilter.All);
    });
});