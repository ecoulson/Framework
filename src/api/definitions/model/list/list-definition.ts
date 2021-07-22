import ModelDefinition from '../common/model-definition';
import ModelType from '../common/model-type';
import ListDefinitionInterface from './list-definition.interface';

export default class ListDefinition extends ModelDefinition {
    constructor(definition: ListDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.elementType,
            rules: definition.rules,
            type: ModelType.OBJECT,
        });
    }

    protected validateModel(): Error[] {
        if (this.isStructureRawType()) {
            return [];
        } else {
            return (this.definition.structure as ModelDefinition).validate();
        }
    }
}
