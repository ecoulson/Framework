import Definition from '../../common/definition';
import ModelDefinitionInterface from './model-definition.interface';
import ModelType from './model-type';

export default abstract class ModelDefinition extends Definition<ModelDefinitionInterface> {
    public get type(): ModelType {
        return this.definition.type;
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

    abstract validateModel(): Error[];
}
