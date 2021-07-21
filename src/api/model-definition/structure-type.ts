import ListDefinition from './list-definition';
import ModelDefinition from './model-definition';

type StructureType =
    | Record<string, ModelDefinition>
    | ListDefinition
    | 'String'
    | 'Number'
    | 'Boolean';
export default StructureType;
