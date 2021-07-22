import DefinitionInterface from '../../definition/definition.interface';
import ModelType from '../common/model-type';
import PrimativeDefinition from '../primative-definition/primative-definition';

export default class BooleanDefinition extends PrimativeDefinition {
    constructor(definition: DefinitionInterface) {
        super({
            name: definition.name,
            primative: 'Boolean',
            rules: [],
            type: ModelType.BOOLEAN,
        });
    }
}
