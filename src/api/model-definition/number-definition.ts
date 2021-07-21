import ModelDefinition from './model-definition';
import NumberDefinitionInterface from './number-definition.interface';

export default class NumberDefinition extends ModelDefinition {
    constructor(definition: NumberDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: 'Number',
        });
    }
}
