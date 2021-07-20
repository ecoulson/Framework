export default class InvalidGatewayNameError extends Error {
    constructor(invalidGatewayName: string) {
        super(`A gateway has an invalid name of "${invalidGatewayName}"`);
    }
}
