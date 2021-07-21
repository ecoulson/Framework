import ModelDefinition from '../model/model-definition';
import Protocol from '../protocol/protocol';

export default interface EntryPointMethodDefinitionInterface {
    name: string;
    protocol: Protocol;
    input: ModelDefinition;
    output: ModelDefinition;
}
