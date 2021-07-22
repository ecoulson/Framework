import ListDefinition from '../list/list-definition';
import ObjectDefinition from '../object/object-definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';
import ModelDefinition from './model-definition';

type StructuralDefinitionType =
    | Record<string, ModelDefinition>
    | ObjectDefinition
    | ListDefinition
    | PrimativeDefinitionType;

export default StructuralDefinitionType;
