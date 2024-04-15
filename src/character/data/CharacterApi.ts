import PagedResultDto from "./entity/PagedResultDto";
import CharacterDetailDto from "./entity/CharacterDetailDto";
import StatusFilter from "../model/Filter";

abstract class CharacterApi {
    abstract getAllCharacters(page: number): Promise<PagedResultDto>;
  
    abstract getCharactersByName(name: string, filter: StatusFilter): Promise<PagedResultDto>;
  
    abstract getCharacterById(id: number): Promise<CharacterDetailDto>;
  }
  
  export default CharacterApi;