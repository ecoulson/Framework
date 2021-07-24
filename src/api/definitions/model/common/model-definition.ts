import { equals, isEmpty } from '../../../../common/util';
import Definition from '../../common/definition';
import PrimativeDefinitionType from '../primative/primative-definition-type';
import ModelDefinitionInterface from './model-definition.interface';
import ModelType from './model-type';

export default abstract class ModelDefinition extends Definition<ModelDefinitionInterface> {
    public get type(): ModelType {
        return this.definition.type;
    }

    protected isStructureAPrimative() {
        return (
            equals(this.definition.structure, PrimativeDefinitionType.BOOLEAN) ||
            equals(this.definition.structure, PrimativeDefinitionType.NUMBER) ||
            equals(this.definition.structure, PrimativeDefinitionType.STRING)
        );
    }

    protected validateDefinition(): Error[] {
        const errors: Error[] = [];
        errors.push(...this.validateStructure(), ...this.validateRules());
        return errors;
    }

    protected validateRules(): Error[] {
        const errors: Error[] = [];
        this.definition.rules.forEach((rule) => {
            errors.push(...rule.validate());
        });
        return errors;
    }

    protected abstract validateStructure(): Error[];
}
