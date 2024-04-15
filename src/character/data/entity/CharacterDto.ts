import CharacterModel from "../../model/CharacterModel";

class CharacterDto {
    id: number;
    name: string;
    status: string;
    image: string;

    constructor(id: number, name: string, status: string, image: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.image = image;
    }

    static fromJson(json: any): CharacterDto {
        return new CharacterDto(
            json.id,
            json.name,
            json.status,
            json.image);
    }
    toModel(): CharacterModel {
        return new CharacterModel({
            id: this.id,
            name: this.name,
            status: this.status,
            imageUrl: this.image,
        });
    }
}

export default CharacterDto;