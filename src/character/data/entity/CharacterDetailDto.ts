import PagedResult from "./PagedResult";
import CharacterDetail from "../../model/CharacterDetail";

class CharacterDetailDto {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: string;
    location: string;
    image: string;

    constructor(id: number, name: string, status: string, species: string, type: string, gender: string, origin: string, location: string, image: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
    }

    static fromJson(json: any): CharacterDetailDto {
        return new CharacterDetailDto(
            json.id,
            json.name,
            json.status,
            json.species,
            json.type,
            json.gender,
            json.origin?.name,
            json.location?.name,
            json.image,
        );
    }

    toModel(): CharacterDetail {
        return new CharacterDetail({
            id: this.id,
            name: this.name,
            status: this.status,
            species: this.species,
            type: this.type,
            gender: this.gender,
            origin: this.origin,
            location: this.location,
            iconUrl: this.image
        });
    }
}

export default CharacterDetailDto;

interface LocationDto {
    name: string;
}

interface OriginDto {
    name: string;
}
