import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import ModelDefinition from '../common/model-definition';

export default interface ExtensionDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    extendedModel: ModelDefinition;
}
