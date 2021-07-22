import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import StructureType from '../common/structural-definition-type';

export default interface ListDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    elementType: StructureType;
}
