import ModelDefinition from '../common/model-definition';
import ModelType from '../common/model-type';
import ExtensionDefinitionInterface from './extension-definition.interface';
import ExtendingRawTypeError from './extending-raw-type-error';
import PrimativeDefinitionType from '../primative/primative-definition-type';

export default class ExtensionDefinition extends ModelDefinition {
    constructor(definition: ExtensionDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.extendedModel,
            rules: definition.rules,
            type: ModelType.EXTENSION,
        });
    }

    protected validateStructure() {
        if (this.isStructureAPrimative()) {
            return [this.createExtendingRawTypeError()];
        }
        return this.validateStructureAsModelDefinition();
    }

    private createExtendingRawTypeError() {
        return new ExtendingRawTypeError(
            this.name,
            this.definition.structure as PrimativeDefinitionType
        );
    }

    private validateStructureAsModelDefinition() {
        return (this.definition.structure as ModelDefinition).validate();
    }
}
