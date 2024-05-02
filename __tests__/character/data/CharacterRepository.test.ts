import CharacterDatabase from "../../../src/character/data/CharacterDb";

jest.mock('../../../src/character/data/CharacterDb');
import CharacterRepositoryImpl from "../../../src/character/data/CharacterRepositoryImpl";
import SuccessResult from "../../../src/character/model/SuccessResult";
import CharacterModel from "../../../src/character/model/CharacterModel";
import CharacterDetailDto from "../../../src/character/data/entity/CharacterDetailDto";
import CharacterDetail from "../../../src/character/model/CharacterDetail";
import ErrorResult from "../../../src/character/model/ErrorResult";

export class MockSQLiteCharacterDatabase {
    initDB = jest.fn().mockResolvedValue({});
    getFavouriteCharacters = jest.fn().mockResolvedValue([]);
    getFavouriteCharacterByName = jest.fn().mockImplementation((name: string) => Promise.resolve(null));
    addCharacterToFavourites = jest.fn().mockResolvedValue(undefined);
    removeCharacterFromFavourites = jest.fn().mockResolvedValue(undefined);
}

export class MockCharacterApi {
    getAllCharacters = jest.fn().mockResolvedValue({toModel: () => ({})});
    getCharactersByName = jest.fn().mockResolvedValue({toModel: () => ({data: []})});
    getCharacterById = jest.fn().mockResolvedValue({toModel: () => ({})});
}

describe('CharacterRepositoryImpl tests', () => {
    const db = new MockSQLiteCharacterDatabase();
    const api = new MockCharacterApi();

    test('getAllCharacters returns characters', async () => {
        api.getAllCharacters.mockResolvedValue({
            toModel: () => ({
                data: [new CharacterModel({
                    id: 1,
                    name: "Rick",
                    status: "alive",
                    imageUrl: "icon",
                    isFavourite: false
                })]
            })
        });
        const repository = new CharacterRepositoryImpl(api, db);
        const result = await repository.getAllCharacters();

        expect(result instanceof SuccessResult).toBe(true);

        if (result instanceof SuccessResult) {
            expect(result.value.length).toBe(1);
            expect(result.value[0]).toEqual(new CharacterModel({
                id: 1,
                name: "Rick",
                status: "alive",
                imageUrl: "icon",
                isFavourite: false
            }));
        }
    });

    test('getAllCharacters returns favorite characters', async () => {
        const db = new MockSQLiteCharacterDatabase();
        const api = new MockCharacterApi();
        api.getAllCharacters.mockResolvedValue({
                toModel: () => ({
                    data: [
                        new CharacterModel({
                            id: 1,
                            name: "Rick",
                            status: "alive",
                            imageUrl: "icon",
                            isFavourite: false
                        }),
                        new CharacterModel({
                            id: 2,
                            name: "Morty",
                            status: "alive",
                            imageUrl: "icon",
                            isFavourite: false
                        })]
                })
            }
        );
        db.getFavouriteCharacters.mockResolvedValue([
            new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon", isFavourite: true})
        ]);
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getAllCharacters();
        expect(result instanceof SuccessResult).toBe(true);

        if (result instanceof SuccessResult) {
            expect(result.value.length).toBe(2);
            expect(result.value).toEqual([
                new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon", isFavourite: true}),
                new CharacterModel({id: 2, name: "Morty", status: "alive", imageUrl: "icon", isFavourite: false})
            ]);
        }
    });

    test('getCharactersByName returns characters by name', async () => {
        const db = new MockSQLiteCharacterDatabase();
        const api = new MockCharacterApi();
        api.getCharactersByName.mockResolvedValue({
                toModel: () => ({
                    data: [
                        new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon"}),
                        new CharacterModel({id: 2, name: "Morty", status: "alive", imageUrl: "icon"})]
                })
            }
        );
        db.getFavouriteCharacters.mockResolvedValue([
            new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon", isFavourite: true})
        ]);
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getCharactersByName("name");
        expect(result instanceof SuccessResult).toBe(true);

        if (result instanceof SuccessResult) {
            expect(result.value.length).toBe(2);
            expect(result.value).toEqual([
                new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon", isFavourite: true}),
                new CharacterModel({id: 2, name: "Morty", status: "alive", imageUrl: "icon", isFavourite: false})
            ]);
        }
    });

    test('getCharacterById returns character', async () => {
        const detail = new CharacterDetailDto(
            1,
            "Rick",
            "alive",
            "species",
            "type",
            "gender",
            "origin",
            "location",
            "image"
        );
        api.getCharacterById.mockResolvedValue(detail);
        db.getFavouriteCharacters.mockResolvedValue([]);
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getCharacterById(1);

        expect(result instanceof SuccessResult).toBeTruthy();
        if (result instanceof SuccessResult) {
            expect(result.value).toEqual(detail.toModel());
        }
    });

    test('getCharacterById returns favourite character', async () => {
        const detail = new CharacterDetailDto(
            1,
            "Rick",
            "alive",
            "species",
            "type",
            "gender",
            "origin",
            "location",
            "image"
        );
        const expected = new CharacterDetail(
            {
                id: 1,
                name: "Rick",
                status: "alive",
                species: "species",
                type: "type",
                gender: "gender",
                origin: "origin",
                location: "location",
                iconUrl: "image",
                isFavourite: true
            }
        );
        api.getCharacterById.mockResolvedValue(detail);
        db.getFavouriteCharacters.mockResolvedValue([
            new CharacterModel({id: 1, name: "Rick", status: "alive", imageUrl: "icon", isFavourite: true})
        ]);
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getCharacterById(1);

        expect(result instanceof SuccessResult).toBeTruthy();
        if (result instanceof SuccessResult) {
            expect(result.value).toEqual(expected);
        }
    });

    test('addCharacterToFavourites calls the right method', async () => {
        const character = new CharacterModel({ id: 1, name: 'Rick', status: 'alive', imageUrl: '' });
        db.addCharacterToFavourites = jest.fn();
        const repository = new CharacterRepositoryImpl(api, db);

        await repository.addCharacterToFavorites(character);

        expect(db.addCharacterToFavourites).toHaveBeenCalledWith(character);
        expect(db.addCharacterToFavourites).toHaveBeenCalledTimes(1);
    });

    test('removeCharacterFromFavourites calls the right method', async () => {
        const character = new CharacterModel({ id: 1, name: 'Rick', status: 'alive', imageUrl: '' });
        db.removeCharacterFromFavourites = jest.fn();
        const repository = new CharacterRepositoryImpl(api, db);

        await repository.removeCharacterFromFavourites(character);

        expect(db.removeCharacterFromFavourites).toHaveBeenCalledWith(character);
        expect(db.removeCharacterFromFavourites).toHaveBeenCalledTimes(1);
    });

    test('getAllCharacters returns error when exception arises', async () => {
        api.getAllCharacters = jest.fn(() => Promise.reject(new Error("Network Error")));
        db.getFavouriteCharacters = jest.fn(() => Promise.resolve([{ id: 1, name: 'Rick', status: 'alive', iconUrl: '' }]));
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getAllCharacters();
        expect(result instanceof ErrorResult).toBe(true);
    });

    test('getCharactersByName returns error when exception arises', async () => {
        api.getCharactersByName = jest.fn(() => Promise.reject(new Error("Network Error")));
        db.getFavouriteCharacters = jest.fn(() => Promise.resolve([{ id: 1, name: 'Rick', status: 'alive', iconUrl: '' }]));
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getCharactersByName("name");
        expect(result instanceof ErrorResult).toBe(true);
    });

    test('getCharacterById returns error when exception arises', async () => {
        api.getCharacterById = jest.fn(() => Promise.reject(new Error("Network Error")));
        const repository = new CharacterRepositoryImpl(api, db);

        const result = await repository.getCharacterById(1);
        expect(result instanceof ErrorResult).toBe(true);
    });
});