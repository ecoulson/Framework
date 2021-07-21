import DefinitionInterface from '../definition/definition.interface';

export default interface RuleDefinitionInterface<ArgType>
    extends DefinitionInterface {
    ruleName: string;
    argument: ArgType;
}
