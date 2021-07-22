import ExtensionDefinitionInterface from './extension-definition.interface';
import ModelDefinition from './model-definition';
import ModelType from './model-type';

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
