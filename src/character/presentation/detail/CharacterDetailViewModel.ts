import { useState, useEffect } from 'react';
import CharacterDetail from "../../model/CharacterDetail";
import {CharacterDetailState} from "./state/CharacterDetailState";
import SuccessResult from "../../model/SuccessResult";
import ErrorResult from "../../model/ErrorResult";
import GetCharacterByIdUseCase from "../../domain/GetCharacterByIdUseCase";
import {ErrorState, LoadingState, SuccessState} from "../../../design/model/ScreenState";

const initialState: CharacterDetailState = {
    state: LoadingState,
    character: null,
};
const CharacterDetailViewModel = (
    id: number,
    getCharacterById: GetCharacterByIdUseCase
) => {
    const [characterState, setCharacterState] = useState<CharacterDetailState>(initialState);

    useEffect(() => {
        const fetchCharacter = async () => {
                setCharacterState({...characterState, state: LoadingState});
                const result = await getCharacterById.execute(id);
                if (result instanceof SuccessResult) {
                    setCharacterState({
                        state: SuccessState,
                        character: result.value,
                    });
                } else if (result instanceof ErrorResult) {
                    setCharacterState({ state: ErrorState, character: null });
                } else {
                    console.log("Should not happen");
                }
        };

        fetchCharacter();
    }, []);

    return {characterState};
};

export default CharacterDetailViewModel;