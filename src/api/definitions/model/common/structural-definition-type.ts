import PrimativeDefinitionType from '../primative/primative-definition-type';
import ModelDefinition from './model-definition';

type StructuralDefinitionType =
    | Record<string, ModelDefinition>
    | ModelDefinition
    | PrimativeDefinitionType;

export default StructuralDefinitionType;
