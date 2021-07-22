import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import ListDefinition from '../list/list-definition';
import ObjectDefinition from '../object/object-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';

export default interface ExtensionDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    extendedModel: ListDefinition | ObjectDefinition | PrimativeDefinitionType;
}
