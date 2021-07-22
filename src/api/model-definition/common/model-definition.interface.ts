import DefinitionInterface from '../../definition/definition.interface';
import RuleDefinition from '../../rule-definition/rule-definition';
import ModelType from './model-type';
import StructureType from './structural-definition-type';

export default interface ModelDefinitionInterface extends DefinitionInterface {
    structure: StructureType;
    rules: RuleDefinition<any>[];
    type: ModelType;
}
