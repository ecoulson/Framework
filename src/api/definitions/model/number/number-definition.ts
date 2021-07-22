import ModelType from '../common/model-type';
import RawDefinitionType from '../common/raw-definition-type';
import PrimativeDefinition from '../primative/primative-definition';
import NumberDefinitionInterface from './number-definition.interface';

export default class NumberDefinition extends PrimativeDefinition {
    constructor(definition: NumberDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            primative: RawDefinitionType.Number,
            type: ModelType.NUMBER,
        });
    }
}
