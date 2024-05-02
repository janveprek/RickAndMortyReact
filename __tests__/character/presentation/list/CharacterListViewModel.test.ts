import RemoveCharacterFromFavoritesUseCase from "../../../../src/character/domain/RemoveCharacterFromFavoritesUseCase";
import AddCharacterToFavoritesUseCaseImpl from "../../../../src/character/domain/AddCharacterToFavoritesUseCaseImpl";
import GetFavoriteCharactersUseCaseImpl from "../../../../src/character/domain/GetFavoriteCharactersUseCase";
import GetCharactersByNameUseCaseImpl from "../../../../src/character/domain/GetCharactersByNameUseCase";
import GetAllCharactersUseCase from "../../../../src/character/domain/GetAllCharactersUseCase";
import CharactersListViewModel from "../../../../src/character/presentation/list/CharacterListViewModel";
import {waitFor} from "@testing-library/react-native";
import SuccessResult from "../../../../src/character/model/SuccessResult";
import CharacterRepositoryImpl from "../../../../src/character/data/CharacterRepositoryImpl";
import {MockCharacterApi, MockSQLiteCharacterDatabase} from "../../data/CharacterRepository.test";
import CharacterListViewModel from "../../../../src/character/presentation/list/CharacterListViewModel";
import RemoveCharacterFromFavoritesUseCaseImpl
    from "../../../../src/character/domain/RemoveCharacterFromFavoritesUseCase";
import { renderHook } from '@testing-library/react-hooks';
jest.mock('react', () => {
    const originalModule = jest.requireActual('react');
    return {
        ...originalModule,
        useState: jest.fn(),
        useEffect: jest.fn((fn) => fn()),
    };
});

describe('CharactersListViewModel', () => {
    const db = new MockSQLiteCharacterDatabase();
    const api = new MockCharacterApi();

    it('fetches characters and sets them on initialization', async () => {
        const mockCharacters = [
            { id: 1, name: 'Rick', status: 'alive', imageUrl: 'url', isFavourite: false },
            { id: 2, name: 'Morty', status: 'alive', imageUrl: 'url', isFavourite: false }
        ];
        const repository = new CharacterRepositoryImpl(api, db);
        GetAllCharactersUseCase.prototype.execute = jest.fn(() => Promise.resolve(new SuccessResult(mockCharacters)));
        GetFavoriteCharactersUseCaseImpl.prototype.execute = jest.fn(() => Promise.resolve([]));

        const viewModel = CharacterListViewModel(new GetAllCharactersUseCase(repository), new GetCharactersByNameUseCaseImpl(repository), new GetFavoriteCharactersUseCaseImpl(repository), new AddCharacterToFavoritesUseCaseImpl(repository), new RemoveCharacterFromFavoritesUseCaseImpl(repository));
        //
        // const viewModel = renderHook(() => CharactersListViewModel(
        //     new GetAllCharactersUseCase(repository),
        //     new GetCharactersByNameUseCaseImpl(repository),
        //     new GetFavoriteCharactersUseCaseImpl(repository),
        //     new AddCharacterToFavoritesUseCaseImpl(repository),
        //     new RemoveCharacterFromFavoritesUseCase(repository)
        // ));
        await waitFor(() => expect(viewModel.charactersState.characters).toEqual(mockCharacters));

        // expect(result.current.charactersState.characters).toEqual(mockCharacters);
        // expect(result.current.charactersState.screenState).toEqual('SuccessState');
    });
});