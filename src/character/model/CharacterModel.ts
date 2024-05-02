class CharacterModel {
    id: number;
    name: string;
    status: string;
    iconUrl: string;
    isFavourite?: boolean;

    constructor({ id, name, status, imageUrl, isFavourite = false}: { id: number; name: string; status: string; imageUrl: string, isFavourite?: boolean }) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.iconUrl = imageUrl;
        this.isFavourite = isFavourite;
    }
}

 export default CharacterModel;