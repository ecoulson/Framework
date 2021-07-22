import ModelDefinition from '../common/model-definition';
import ModelType from '../common/model-type';
import ExtensionDefinitionInterface from './extension-definition.interface';

export default class ExtensionDefinition extends ModelDefinition {
    constructor(definition: ExtensionDefinitionInterface) {
        super({
            name: definition.name,
            structure: definition.extendedModel,
            rules: definition.rules,
            type: ModelType.EXTENSION,
        });
    }

    public validateModel() {
        return [];
    }
}
