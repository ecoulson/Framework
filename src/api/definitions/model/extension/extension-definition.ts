import { equals } from '../../../../common/util';
import ModelDefinition from '../common/model-definition';
import ModelType from '../common/model-type';
import ExtensionDefinitionInterface from './extension-definition.interface';
import RawDefinitionType from '../common/raw-definition-type';
import ExtendingRawTypeError from './extending-raw-type-error';

export default class ExtensionDefinition extends ModelDefinition {
    constructor(definition: ExtensionDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.extendedModel,
            rules: definition.rules,
            type: ModelType.EXTENSION,
        });
    }

    protected validateModel() {
        if (this.isStructureRawType()) {
            return [this.createExtendingRawTypeError()];
        }
        return this.validateStructureAsModelDefinition();
    }

    private createExtendingRawTypeError() {
        return new ExtendingRawTypeError(this.name, this.definition.structure as RawDefinitionType);
    }

    private validateStructureAsModelDefinition() {
        return (this.definition.structure as ModelDefinition).validate();
    }
}
