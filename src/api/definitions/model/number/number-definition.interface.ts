import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';

export default interface NumberDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
}
