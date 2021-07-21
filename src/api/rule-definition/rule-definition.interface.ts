import DefinitionInterface from '../definition/definition.interface';
import RuleType from './rule-type';

export default interface RuleDefinitionInterface<ArgType>
    extends DefinitionInterface {
    ruleName: string;
    argument: ArgType;
    type: RuleType;
}
