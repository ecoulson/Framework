import RawDefinitionType from '../common/raw-definition-type';

export default class ExtendingRawTypeError extends Error {
    constructor(name: string, type: RawDefinitionType) {
        super(
            `Extension definition "${name}" is illegally trying to extend the raw type "${type}"`
        );
        this.name = 'ExtendingRawTypeError';
    }
}
