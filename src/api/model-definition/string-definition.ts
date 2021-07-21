import ModelDefinition from './model-definition';
import StringDefinitionInterface from './string-definition.interface';

export default class StringDefinition extends ModelDefinition {
    constructor(definition: StringDefinitionInterface) {
        super({
            name: definition.name,
            rules: definition.rules,
            structure: 'String',
        });
    }
}
