import Protocol from '../../protocol/protocol';
import DefinitionInterface from '../common/definition.interface';
import ModelDefinition from '../model-definition/common/model-definition';

export default interface EntryPointMethodDefinitionInterface extends DefinitionInterface {
    protocol: Protocol;
    input: ModelDefinition;
    output: ModelDefinition;
}
