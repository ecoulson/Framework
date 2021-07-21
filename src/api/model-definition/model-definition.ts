import Definition from '../definition/definition';
import ModelDefinitionInterface from './model-definition.interface';

export default class ModelDefinition extends Definition<ModelDefinitionInterface> {
    validateDefinition(): Error[] {
        throw new Error('not implemented');
    }
}
