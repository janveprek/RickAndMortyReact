import CharacterModel from "../../model/CharacterModel";

class PagedResult {
    data: CharacterModel[];

    constructor(data: CharacterModel[]) {
        this.data = data;
    }
}

export default PagedResult;