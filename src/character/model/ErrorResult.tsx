import ResultWrapper from "./ResultWrapper";

class ErrorResult<T> extends ResultWrapper<T> {
    error: Error;

    constructor(error: Error) {
        super();
        this.error = error;
    }
}

export default ErrorResult;