import CharacterModel from "../../../model/CharacterModel";
import {ScreenState} from "../../../../design/model/ScreenState";
import StatusFilter from "../../../model/Filter";

export interface CharactersListState {
    characters: CharacterModel[];
    favorites: CharacterModel[];
    screenState: ScreenState;
    query: string,
    appliedFilter: StatusFilter;
}