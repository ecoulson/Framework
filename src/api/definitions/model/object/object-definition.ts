import ModelDefinition from '../common/model-definition';
import ObjectDuplicateNameMap from './object-duplicate-name-map';
import ModelType from '../common/model-type';
import ObjectDefinitionInterface from './object-definition.interface';

export default class ObjectDefinition extends ModelDefinition {
    constructor(definition: ObjectDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: definition.structure,
            type: ModelType.OBJECT,
        });
    }

    protected validateModel() {
        const errors: Error[] = [];
        errors.push(...this.validateModels(), ...this.validateDuplicateKeys());
        return errors;
    }

    private validateModels() {
        const structure = this.definition.structure as Record<string, ModelDefinition>;
        const errors: Error[] = [];
        Object.keys(structure).forEach((key) => {
            errors.push(...structure[key].validate());
        });
        return errors;
    }

    private validateDuplicateKeys() {
        const nameMap = new ObjectDuplicateNameMap(
            this.definition.structure as Record<string, ModelDefinition>
        );
        return nameMap.generateDuplicateErrorsForObjectDefinition(this.name);
    }
}
