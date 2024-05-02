import {CharacterRepository} from "../../../src/character/domain/CharacterRepository";
import ResultWrapper from "../../../src/character/model/ResultWrapper";
import CharacterModel from "../../../src/character/model/CharacterModel";
import CharacterDetail from "../../../src/character/model/CharacterDetail";
import StatusFilter from "../../../src/character/model/Filter";
import AddCharacterToFavoritesUseCaseImpl from "../../../src/character/domain/AddCharacterToFavoritesUseCaseImpl";

describe('AddCharacterToFavoritesUseCaseImpl', () => {
    it('should call addCharacterToFavorites once', async () => {
        const mockRepository: CharacterRepository = {
            getAllCharacters(page: number): Promise<ResultWrapper<CharacterModel[]>> {
                return Promise.resolve(undefined);
            }, getCharacterById(id: number): Promise<ResultWrapper<CharacterDetail>> {
                return Promise.resolve(undefined);
            }, getCharactersByName(name: string, filter: StatusFilter): Promise<ResultWrapper<CharacterModel[]>> {
                return Promise.resolve(undefined);
            }, getFavouriteCharacters(): Promise<CharacterModel[]> {
                return Promise.resolve([]);
            }, removeCharacterFromFavourites(character: CharacterModel): Promise<void> {
                return Promise.resolve(undefined);
            },
            addCharacterToFavorites: jest.fn()
        };

        const useCase = new AddCharacterToFavoritesUseCaseImpl(mockRepository);

        const character = new CharacterModel({
            id: 1,
            name: "name",
            status: "status",
            imageUrl: "url",
        });

        await useCase.execute(character);
        expect(mockRepository.addCharacterToFavorites).toHaveBeenCalledTimes(1);
        expect(mockRepository.addCharacterToFavorites).toHaveBeenCalledWith(character);
    });
});