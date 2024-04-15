class CharacterModel {
    id: number;
    name: string;
    status: string;
    iconUrl: string;
    isFavourite?: boolean;

    constructor({ id, name, status, imageUrl }: { id: number; name: string; status: string; imageUrl: string }) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.iconUrl = imageUrl;
        this.isFavourite = false;
    }
}

 export default CharacterModel;