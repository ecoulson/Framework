import ModelDefinition from '../common/model-definition';
import PrimativeDefinitionInterface from './primative-definition.interface';

export default class PrimativeDefinition extends ModelDefinition {
    constructor(definition: PrimativeDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.primative,
            rules: definition.rules,
            type: definition.type,
        });
    }

    protected validateModel() {
        if (this.isStructureRawType()) {
            return [];
        }
        return this.validatePrimativeDefinition();
    }

    private validatePrimativeDefinition(): Error[] {
        return (this.definition.structure as PrimativeDefinition).validate();
    }
}
