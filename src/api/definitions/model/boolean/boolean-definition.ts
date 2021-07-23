import DefinitionInterface from '../../common/definition.interface';
import ModelType from '../common/model-type';
import PrimativeDefinition from '../primative/primative-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';

export default class BooleanDefinition extends PrimativeDefinition {
    constructor(definition: DefinitionInterface) {
        super({
            name: definition.name,
            primative: PrimativeDefinitionType.BOOLEAN,
            rules: [],
            type: ModelType.BOOLEAN,
        });
    }
}
