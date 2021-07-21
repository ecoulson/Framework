import DefinitionInterface from '../definition/definition.interface';
import EntryPointMethodDefinition from '../entry-point-method/entry-point-method-definition';

export default interface EntryPointDefintionInterface
    extends DefinitionInterface {
    methods: EntryPointMethodDefinition[];
}
