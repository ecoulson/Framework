import IllegalDefinitionTypeError from '../common/illegal-definition-type-error';
import ModelDefinition from '../common/model-definition';
import PrimativeDefinitionInterface from './primative-definition.interface';

export default abstract class PrimativeDefinition extends ModelDefinition {
    constructor(definition: PrimativeDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.primative,
            rules: definition.rules,
            type: definition.type,
        });
    }

    protected validateStructure() {
        if (this.isStructureAPrimative()) {
            return [];
        }
        return [
            new IllegalDefinitionTypeError(
                `Primative definition "${this.name}" must be a primative type`
            ),
        ];
    }
}
