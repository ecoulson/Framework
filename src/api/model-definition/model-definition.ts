import Definition from '../definition/definition';
import DuplicateStructureNameError from './duplicate-structure-name-error';
import ModelDefinitionNameMap from './model-definition-name-map';
import ModelDefinitionInterface from './model-definition.interface';

export default class ModelDefinition extends Definition<ModelDefinitionInterface> {
    protected validateDefinition(): Error[] {
        const errors: Error[] = [];
        errors.push(...this.validateStructure(), ...this.validateRules());
        return errors;
    }

    private validateRules(): Error[] {
        const errors: Error[] = [];
        this.definition.rules.forEach((rule) => {
            errors.push(...rule.validate());
        });
        return errors;
    }

    private validateStructure(): Error[] {
        if (this.isPrimativeStructure()) {
            return [];
        } else if (this.isListDefinition()) {
            return this.validateListStructure();
        } else {
            return this.validateObjectStructure();
        }
    }

    private isPrimativeStructure() {
        return (
            this.definition.structure === 'String' ||
            this.definition.structure === 'Boolean' ||
            this.definition.structure === 'Number'
        );
    }

    private isListDefinition() {
        return this.definition.structure instanceof ModelDefinition;
    }

    private validateListStructure(): Error[] {
        return (this.definition.structure as ModelDefinition).validate();
    }

    private validateObjectStructure() {
        const errors: Error[] = [];
        errors.push(...this.validateModels(), ...this.validateDuplicateKeys());
        return errors;
    }

    private validateModels() {
        const structure = this.definition.structure as Record<
            string,
            ModelDefinition
        >;
        const errors: Error[] = [];
        Object.keys(structure).forEach((key) => {
            errors.push(...structure[key].validate());
        });
        return errors;
    }

    private validateDuplicateKeys() {
        const errors: Error[] = [];
        const nameMap = new ModelDefinitionNameMap(
            this.definition.structure as Record<string, ModelDefinition>
        );
        nameMap.getDuplicates().forEach((pair) => {
            errors.push(new DuplicateStructureNameError(this.name, pair));
        });
        return errors;
    }
}
