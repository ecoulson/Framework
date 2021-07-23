import PrimativeDefinitionType from '../primative/primative-definition-type';

export default class ExtendingRawTypeError extends Error {
    constructor(name: string, type: PrimativeDefinitionType) {
        super(
            `Extension definition "${name}" is illegally trying to extend the primative type "${type}"`
        );
        this.name = 'ExtendingRawTypeError';
    }
}
