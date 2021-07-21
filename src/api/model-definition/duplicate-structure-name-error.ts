export default class DuplicateStructureNameError extends Error {
    constructor(modelName: string, duplicateValue: string, keys: string[]) {
        super(
            `Model ${modelName} has a duplicate name (${duplicateValue}) on keys ${keys.join(
                ', '
            )}`
        );
        this.name = 'DuplicateStructureNameError';
    }
}
