import DefinitionInterface from '../../definition/definition.interface';
import RuleDefinition from '../../rule-definition/rule-definition';
import ModelDefinition from '../common/model-definition';
import PrimativeDefinitionType from '../primative-definition/primative-definition-type';

export default interface ExtensionDefinitionInterface
    extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    extendedModel: ModelDefinition | PrimativeDefinitionType;
}
