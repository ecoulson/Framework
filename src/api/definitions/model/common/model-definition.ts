import { equals } from '../../../../common/util';
import Definition from '../../common/definition';
import ModelDefinitionInterface from './model-definition.interface';
import ModelType from './model-type';
import RawDefinitionType from './raw-definition-type';

export default abstract class ModelDefinition extends Definition<ModelDefinitionInterface> {
    public get type(): ModelType {
        return this.definition.type;
    }

    protected isStructureRawType() {
        return (
            equals(this.definition.structure, RawDefinitionType.Boolean) ||
            equals(this.definition.structure, RawDefinitionType.Number) ||
            equals(this.definition.structure, RawDefinitionType.String)
        );
    }

    protected validateDefinition(): Error[] {
        const errors: Error[] = [];
        errors.push(...this.validateModel(), ...this.validateRules());
        return errors;
    }

    protected validateRules(): Error[] {
        const errors: Error[] = [];
        this.definition.rules.forEach((rule) => {
            errors.push(...rule.validate());
        });
        return errors;
    }

    protected abstract validateModel(): Error[];
}
