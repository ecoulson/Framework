import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import ModelType from './model-type';
import StructureType from './structural-definition-type';

export default interface ModelDefinitionInterface extends DefinitionInterface {
    structure: StructureType;
    rules: RuleDefinition<any>[];
    type: ModelType;
}
