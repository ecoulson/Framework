export default class IllegalDefinitionTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IllegalDefinitionTypeError';
    }
}
