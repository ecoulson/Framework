import DefinitionInterface from '../definition/definition.interface';
import RuleDefinition from '../rule-definition/rule-definition';
import StructureType from './structure-type';

export default interface ExtensionDefinitionInterface
    extends DefinitionInterface {
    rules: RuleDefinition<any>[];
    extendedModel: StructureType;
}
