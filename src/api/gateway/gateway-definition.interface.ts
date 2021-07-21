import DefinitionInterface from '../definition.interface';
import EntryPointDefintion from '../entry-point/entry-point-definition';

export default interface GatewayDefinitionInterface
    extends DefinitionInterface {
    entryPointDefinitions: EntryPointDefintion[];
}
