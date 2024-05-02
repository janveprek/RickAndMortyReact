import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import GetAllCharactersUseCaseImpl from "../../../src/character/domain/GetAllCharactersUseCase";
import GetCharacterByIdUseCaseImpl from "../../../src/character/domain/GetCharacterByIdUseCase";

describe('GetCharacterByIdUseCaseImplTest', () => {
    it('should call getCharacterById once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharactersByName: jest.fn(),
            getFavouriteCharacters: jest.fn(),
            removeCharacterFromFavourites: jest.fn(),
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new GetCharacterByIdUseCaseImpl(mockRepository);

        await useCase.execute(1);
        expect(mockRepository.getCharacterById).toHaveBeenCalledTimes(1);
        expect(mockRepository.getCharacterById).toHaveBeenCalledWith(1);
    });
});