import DefinitionInterface from '../../definition/definition.interface';
import RuleDefinition from '../../rule-definition/rule-definition';
import StructureType from '../common/structural-definition-type';

export default interface ListDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    elementType: StructureType;
}
