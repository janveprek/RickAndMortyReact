import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import GetFavoriteCharactersUseCaseImpl from "../../../src/character/domain/GetFavoriteCharactersUseCase";
import RemoveCharacterFromFavoritesUseCaseImpl from "../../../src/character/domain/RemoveCharacterFromFavoritesUseCase";
import CharacterModel from "../../../src/character/model/CharacterModel";

describe('RemoveCharacterFromFavouritesUseCaseImplTest', () => {
    it('should call removeCharacterFromFavorites once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharactersByName: jest.fn(),
            getFavouriteCharacters: jest.fn(),
            removeCharacterFromFavourites: jest.fn(),
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new RemoveCharacterFromFavoritesUseCaseImpl(mockRepository);
        const character = new CharacterModel({
            id: 1,
            name: "name",
            status: "status",
            imageUrl: "url",
        });

        await useCase.execute(character);
        expect(mockRepository.removeCharacterFromFavourites).toHaveBeenCalledTimes(1);
        expect(mockRepository.removeCharacterFromFavourites).toHaveBeenCalledWith(character);
    });
});