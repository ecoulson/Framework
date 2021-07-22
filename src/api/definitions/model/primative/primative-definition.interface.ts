import DefinitionInterface from '../../common/definition.interface';
import RuleDefinition from '../../rule/rule-definition';
import PrimativeType from './primative-type';
import PrimativeDefinitionType from './primative-definition-type';

export default interface PrimativeDefinitionInterface extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    primative: PrimativeDefinitionType;
    type: PrimativeType;
}
