import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';

export default interface StringDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
}
