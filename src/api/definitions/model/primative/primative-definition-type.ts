import BooleanDefinition from '../boolean/boolean-definition';
import RawDefinitionType from '../common/raw-definition-type';
import NumberDefinition from '../number/number-definition';
import StringDefinition from '../string/string-definition';

type PrimativeDefinitionType =
    | StringDefinition
    | NumberDefinition
    | BooleanDefinition
    | RawDefinitionType;

export default PrimativeDefinitionType;
