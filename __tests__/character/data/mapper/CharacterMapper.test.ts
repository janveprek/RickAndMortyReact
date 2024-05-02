import CharacterDetail from "../../../../src/character/model/CharacterDetail";
import CharacterDetailDto from "../../../../src/character/data/entity/CharacterDetailDto";
import CharacterModel from "../../../../src/character/model/CharacterModel";
import PagedResultDto from "../../../../src/character/data/entity/PagedResultDto";
import CharacterDto from "../../../../src/character/data/entity/CharacterDto";

describe('CharacterDetailDto', () => {
    it('should map character detail to model correctly', () => {
        const characterDto = new CharacterDetailDto(
            1,
            "Rick",
            "Alive",
            "Human",
            "Scientist",
            "Male",
            "Earth",
            "Earth",
            "https://example.com/rick.png"
        );
        const expectedModel = new CharacterDetail({
            id: 1,
            name: "Rick",
            status: "Alive",
            species: "Human",
            type: "Scientist",
            gender: "Male",
            origin: "Earth",
            location: "Earth",
            iconUrl: "https://example.com/rick.png"
        });

        const resultModel = characterDto.toModel();
        expect(resultModel).toEqual(expectedModel);
    });
});

describe('CharacterDto', () => {
    test('should map to model correctly', () => {
        const characterDto = new CharacterDto(
            2,
            "name",
            "status",
            "image",
        );

        const expected = new CharacterModel({
            id: 2,
            name: "name",
            status: "status",
            imageUrl: "image",
            isFavourite: false,
        });

        const result = characterDto.toModel();
        expect(result).toEqual(expected);
    });
});

describe('PagedResultDto', () => {
    test('should map to model correctly', () => {
        const pagedResultDto = new PagedResultDto({
            result: [
                new CharacterDto(2,
                    "name",
                    "status",
                    "image")
            ]
        });

        const expected = [new CharacterModel({
            id: 2,
            name: "name",
            status: "status",
            imageUrl: "image",
            isFavourite: false,
        })];

        const result = pagedResultDto.toModel();
        expect(result.data).toEqual(expected);
    });
});