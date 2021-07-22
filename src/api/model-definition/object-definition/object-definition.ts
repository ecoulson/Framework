import ModelDefinition from '../common/model-definition';
import ModelDefinitionNameMap from './model-definition-name-map';
import ModelType from '../common/model-type';
import ObjectDefinitionInterface from './object-definition.interface';
import DuplicateStructureNameError from './duplicate-structure-name-error';

export default class ObjectDefinition extends ModelDefinition {
    constructor(definition: ObjectDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: definition.structure,
            type: ModelType.OBJECT,
        });
    }

    public validateModel() {
        const errors: Error[] = [];
        errors.push(...this.validateModels(), ...this.validateDuplicateKeys());
        return errors;
    }

    private validateModels() {
        const structure = this.definition.structure as Record<
            string,
            ModelDefinition
        >;
        const errors: Error[] = [];
        Object.keys(structure).forEach((key) => {
            errors.push(...structure[key].validate());
        });
        return errors;
    }

    private validateDuplicateKeys() {
        const errors: Error[] = [];
        const nameMap = new ModelDefinitionNameMap(
            this.definition.structure as Record<string, ModelDefinition>
        );
        nameMap.getDuplicates().forEach((pair) => {
            errors.push(new DuplicateStructureNameError(this.name, pair));
        });
        return errors;
    }
}
