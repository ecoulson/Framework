export default class InvalidGatewayNameError extends Error {
    constructor(invalidGatewayName: string, pattern: RegExp) {
        super(
            `A gateway has an invalid name of "${invalidGatewayName}". Gateway names must match the pattern RegExp(${pattern.toString()})`
        );
    }
}
