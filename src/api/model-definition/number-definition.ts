import ModelType from './model-type';
import NumberDefinitionInterface from './number-definition.interface';
import PrimativeDefinition from './primative-definition';

export default class NumberDefinition extends PrimativeDefinition {
    constructor(definition: NumberDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: 'Number',
            type: ModelType.NUMBER,
        });
    }
}
