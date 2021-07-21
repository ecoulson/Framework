import ListDefinitionInterface from './list-definition.interface';
import ModelDefinition from './model-definition';

export default class ListDefinition extends ModelDefinition {
    constructor(definition: ListDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.elementType,
            rules: definition.rules,
        });
    }
}
