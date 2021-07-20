import Definition from '../definition';

export default class EntryPointDefintion extends Definition {
    public get name(): string {
        throw new Error('not implemented');
    }

    validateDefinition(): Error[] {
        throw new Error('not implemented');
    }
}
