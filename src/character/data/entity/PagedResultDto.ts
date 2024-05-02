import PagedResult from "./PagedResult";
import CharacterDto from "./CharacterDto";
import {unmountComponentAtNode} from "react-dom";

class PagedResultDto {
    result: CharacterDto[];


    constructor(data: { result: CharacterDto[] }) {
        this.result = data.result;
    }

    static fromJson(json: any): PagedResultDto {
        const characters = json.results.map((item: any) => {
            return CharacterDto.fromJson(item);
        });
        return new PagedResultDto({result: characters});
    }

    toModel(): PagedResult {
        return new PagedResult(this.result.map(item => item.toModel()));
    }
}

export default PagedResultDto;