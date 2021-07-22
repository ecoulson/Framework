import BooleanDefinition from '../boolean-definition/boolean-definition';
import NumberDefinition from '../number-definition/number-definition';
import StringDefinition from '../string-definition/string-definition';

type PrimativeDefinitionType =
    | StringDefinition
    | NumberDefinition
    | BooleanDefinition
    | 'String'
    | 'Boolean'
    | 'Number';

export default PrimativeDefinitionType;
