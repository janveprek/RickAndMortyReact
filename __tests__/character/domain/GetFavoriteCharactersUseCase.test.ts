import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import GetCharactersByNameUseCaseImpl from "../../../src/character/domain/GetCharactersByNameUseCase";
import StatusFilter from "../../../src/character/model/Filter";
import GetFavoriteCharactersUseCaseImpl from "../../../src/character/domain/GetFavoriteCharactersUseCase";

describe('GetFavouriteCharactersUseCaseImplTest', () => {
    it('should call getFavouriteCharacters once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharactersByName: jest.fn(),
            getFavouriteCharacters: jest.fn(),
            removeCharacterFromFavourites: jest.fn(),
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new GetFavoriteCharactersUseCaseImpl(mockRepository);

        await useCase.execute();
        expect(mockRepository.getFavouriteCharacters).toHaveBeenCalledTimes(1);
    });
});