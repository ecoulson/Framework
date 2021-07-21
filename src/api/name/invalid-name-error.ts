export default class InvalidNameError extends Error {
    constructor(invalidName: string, namePattern: RegExp) {
        super(
            `A definition has an invalid name of "${invalidName}". Definition names must match the pattern RegExp(${namePattern.toString()})`
        );
    }
}
