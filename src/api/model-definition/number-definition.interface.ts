import DefinitionInterface from '../definition/definition.interface';
import RuleDefinition from '../rule-definition/rule-definition';

export default interface NumberDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
}
