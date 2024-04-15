import ResultWrapper from "./ResultWrapper";

class SuccessResult<T> extends ResultWrapper<T> {
    value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }
}

export default SuccessResult;