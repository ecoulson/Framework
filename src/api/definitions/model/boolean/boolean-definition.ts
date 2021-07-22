import DefinitionInterface from '../../common/definition.interface';
import ModelType from '../common/model-type';
import RawDefinitionType from '../common/raw-definition-type';
import PrimativeDefinition from '../primative/primative-definition';

export default class BooleanDefinition extends PrimativeDefinition {
    constructor(definition: DefinitionInterface) {
        super({
            name: definition.name,
            primative: RawDefinitionType.Boolean,
            rules: [],
            type: ModelType.BOOLEAN,
        });
    }
}
