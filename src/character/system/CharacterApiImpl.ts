import CharacterApi from "../data/CharacterApi";
import PagedResultDto from "../data/entity/PagedResultDto";
import CharacterDetailDto from "../data/entity/CharacterDetailDto";
import StatusFilter from "../model/Filter";

class CharacterApiImpl implements CharacterApi {
    async getAllCharacters(page: number = 1): Promise<PagedResultDto> {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await response.json();
        return PagedResultDto.fromJson(data);
    }

    async getCharactersByName(name: string, filter = StatusFilter.All): Promise<PagedResultDto> {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=${StatusFilter.getApiName(filter)}`);
        const data = await response.json();
        return PagedResultDto.fromJson(data);
    }

    async getCharacterById(id: number): Promise<CharacterDetailDto> {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        return CharacterDetailDto.fromJson(data);
    }
}

export default CharacterApiImpl;