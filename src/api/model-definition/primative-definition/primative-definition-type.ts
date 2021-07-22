import BooleanDefinition from '../boolean-definition/boolean-definition';
import RawDefinitionType from '../common/raw-definition-type';
import NumberDefinition from '../number-definition/number-definition';
import StringDefinition from '../string-definition/string-definition';

type PrimativeDefinitionType =
    | StringDefinition
    | NumberDefinition
    | BooleanDefinition
    | RawDefinitionType;

export default PrimativeDefinitionType;
