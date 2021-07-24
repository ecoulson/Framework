import ModelDefinition from '../common/model-definition';
import ObjectDuplicateNameMap from './object-duplicate-name-map';
import ModelType from '../common/model-type';
import ObjectDefinitionInterface from './object-definition.interface';
import IllegalDefinitionTypeError from '../common/illegal-definition-type-error';
import { isNil, isPlainObject } from '../../../../common/util';

export default class ObjectDefinition extends ModelDefinition {
    constructor(definition: ObjectDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: definition.structure,
            type: ModelType.OBJECT,
        });
    }

    get structure(): Record<string, ModelDefinition> {
        return this.definition.structure as Record<string, ModelDefinition>;
    }

    protected validateStructureType() {
        if (isPlainObject(this.definition.structure)) {
            return [];
        }
        return [new IllegalDefinitionTypeError(this.getTypeErrorMessage())];
    }

    private getTypeErrorMessage() {
        return `The structure of object definition "${this.name}" is not of type Record<string, ModelDefinition>. Please check that you have provided the correct structure`;
    }

    protected validateStructure() {
        const errors: Error[] = [];
        errors.push(...this.validateStructureModels(), ...this.validateDuplicateKeys());
        return errors;
    }

    private validateStructureModels() {
        const errors: Error[] = [];
        Object.keys(this.structure).forEach((key) => {
            errors.push(...this.structure[key].validate());
        });
        return errors;
    }

    private validateDuplicateKeys() {
        const nameMap = new ObjectDuplicateNameMap(this);
        return nameMap.generateDuplicateErrorsForObjectDefinition();
    }
}
