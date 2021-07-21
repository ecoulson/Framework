import DefinitionInterface from '../definition/definition.interface';
import RuleDefinition from '../rule-definition/rule-definition';
import StructureType from './structure-type';

export default interface ModelDefinitionInterface extends DefinitionInterface {
    structure: StructureType;
    rules: RuleDefinition<any>[];
}
