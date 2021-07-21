import DefinitionInterface from '../definition/definition.interface';
import ModelDefinition from '../model-definition/model-definition';
import Protocol from '../protocol/protocol';

export default interface EntryPointMethodDefinitionInterface
    extends DefinitionInterface {
    protocol: Protocol;
    input: ModelDefinition;
    output: ModelDefinition;
}
