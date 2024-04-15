import CharacterDetailDto from "../data/entity/CharacterDetailDto";

class CharacterDetail {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: string;
    location: string;
    iconUrl: string;

    constructor({ id, name, status, species, type, gender, origin, location, iconUrl }) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.iconUrl = iconUrl;
    }
}

export default CharacterDetail;
