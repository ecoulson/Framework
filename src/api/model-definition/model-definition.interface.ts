import DefinitionInterface from '../definition/definition.interface';
import ModelDefinition from './model-definition';
import ModelRule from './rules/model-rules/model-rule';

export default interface ModelDefinitionInterface extends DefinitionInterface {
    structure: Record<string, ModelDefinition>;
    rule: ModelRule[];
}
