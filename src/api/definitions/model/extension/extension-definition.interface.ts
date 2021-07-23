import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import ModelDefinition from '../common/model-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';

export default interface ExtensionDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    extendedModel: ModelDefinition | PrimativeDefinitionType;
}
