import ModelType from '../common/model-type';
import PrimativeDefinition from '../primative-definition/primative-definition';
import StringDefinitionInterface from './string-definition.interface';

export default class StringDefinition extends PrimativeDefinition {
    constructor(definition: StringDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            primative: 'String',
            type: ModelType.STRING,
        });
    }
}
