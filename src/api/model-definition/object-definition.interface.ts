import DefinitionInterface from '../definition/definition.interface';
import RuleDefinition from '../rule-definition/rule-definition';
import ModelDefinition from './model-definition';

export default interface ObjectDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    structure: Record<string, ModelDefinition>;
}
