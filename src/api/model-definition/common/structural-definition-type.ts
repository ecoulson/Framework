import ListDefinition from '../list-definition/list-definition';
import ObjectDefinition from '../object-definition/object-definition';
import PrimativeDefinitionType from '../primative-definition/primative-definition-type';
import ModelDefinition from './model-definition';

type StructuralDefinitionType =
    | Record<string, ModelDefinition>
    | ObjectDefinition
    | ListDefinition
    | PrimativeDefinitionType;

export default StructuralDefinitionType;
