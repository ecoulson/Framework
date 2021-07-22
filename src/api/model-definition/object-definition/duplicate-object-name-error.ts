import NameKeysDuplicatePair from '../common/name-keys-duplicate-pair';

export default class DuplicateObjectNameError extends Error {
    constructor(modelName: string, duplicatePair: NameKeysDuplicatePair) {
        super(
            `Object ${modelName} has a duplicate name (${
                duplicatePair.name
            }) on keys ${duplicatePair.keys.join(', ')}`
        );
        this.name = 'DuplicateStructureNameError';
    }
}
