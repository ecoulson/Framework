export default class NoEntryPointDefinitionsError extends Error {
    constructor(gatewayName: string) {
        super(`${gatewayName} needs at least one entry point`);
        this.name = 'NoEntryPointDefinitionsError';
    }
}
