import DefinitionInterface from '../definition.interface';
import ModelDefinition from '../model/model-definition';
import Protocol from '../protocol/protocol';

export default interface EntryPointMethodDefinitionInterface
    extends DefinitionInterface {
    protocol: Protocol;
    input: ModelDefinition;
    output: ModelDefinition;
}
