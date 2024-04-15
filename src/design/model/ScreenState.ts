export interface ScreenState {}

export class LoadingState implements ScreenState {
    constructor() {}
}

export class ErrorState implements ScreenState {
    constructor() {}
}

export class EmptyState implements ScreenState {
    constructor() {}
}

export class SuccessState implements ScreenState {
    constructor() {}
}