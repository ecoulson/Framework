import DefinitionInterface from '../definition/definition.interface';
import ModelDefinition from './model-definition';

export default class BooleanDefinition extends ModelDefinition {
    constructor(definition: DefinitionInterface) {
        super({
            name: definition.name,
            structure: "Boolean",
            rules: []
        })
    }
}
