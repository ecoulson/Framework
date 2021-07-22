import ListDefinitionInterface from './list-definition.interface';
import ModelDefinition from './model-definition';
import ModelType from './model-type';

export default class ListDefinition extends ModelDefinition {
    constructor(definition: ListDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.elementType,
            rules: definition.rules,
            type: ModelType.OBJECT,
        });
    }

    public validateModel() {
        return [];
    }
}
