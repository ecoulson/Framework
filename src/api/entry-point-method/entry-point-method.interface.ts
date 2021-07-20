import ModelDefinition from '../model/model-definition';

export default interface EntryPointMethodInterface {
    name: string;
    input: ModelDefinition;
    output: ModelDefinition;
}
