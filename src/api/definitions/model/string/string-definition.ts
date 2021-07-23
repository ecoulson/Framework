import ModelType from '../common/model-type';
import PrimativeDefinition from '../primative/primative-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';
import StringDefinitionInterface from './string-definition.interface';

export default class StringDefinition extends PrimativeDefinition {
    constructor(definition: StringDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            primative: PrimativeDefinitionType.STRING,
            type: ModelType.STRING,
        });
    }
}
