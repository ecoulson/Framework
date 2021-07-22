import DefinitionInterface from '../definition/definition.interface';
import ModelType from '../model-definition/model-type';

export default interface RuleDefinitionInterface<ArgType>
    extends DefinitionInterface {
    ruleName: string;
    argument: ArgType;
    type: ModelType;
}
