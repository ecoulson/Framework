import ModelType from '../common/model-type';
import PrimativeDefinition from '../primative/primative-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';
import NumberDefinitionInterface from './number-definition.interface';

export default class NumberDefinition extends PrimativeDefinition {
    constructor(definition: NumberDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            primative: PrimativeDefinitionType.NUMBER,
            type: ModelType.NUMBER,
        });
    }
}
