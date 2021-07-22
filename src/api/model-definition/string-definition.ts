import ModelType from './model-type';
import PrimativeDefinition from './primative-definition';
import StringDefinitionInterface from './string-definition.interface';

export default class StringDefinition extends PrimativeDefinition {
    constructor(definition: StringDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: 'String',
            type: ModelType.STRING,
        });
    }
}
