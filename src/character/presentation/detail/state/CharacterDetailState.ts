import CharacterDetail from "../../../model/CharacterDetail";
import {ScreenState} from "../../../../design/model/ScreenState";

export type CharacterDetailState = {
    state: ScreenState;
    character: CharacterDetail | null;
}