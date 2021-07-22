import DefinitionInterface from '../definition/definition.interface';
import ModelType from './model-type';
import PrimativeDefinition from './primative-definition';

export default class BooleanDefinition extends PrimativeDefinition {
    constructor(definition: DefinitionInterface) {
        super({
            name: definition.name,
            structure: 'Boolean',
            rules: [],
            type: ModelType.BOOLEAN,
        });
    }
}
