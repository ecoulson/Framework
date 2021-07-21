import NameKeysDuplicatePair from './name-keys-duplicate-pair';

export default class DuplicateStructureNameError extends Error {
    constructor(modelName: string, duplicatePair: NameKeysDuplicatePair) {
        super(
            `Model ${modelName} has a duplicate name (${
                duplicatePair.name
            }) on keys ${duplicatePair.keys.join(', ')}`
        );
        this.name = 'DuplicateStructureNameError';
    }
}
