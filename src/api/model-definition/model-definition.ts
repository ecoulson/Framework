import { hasLength } from '../../common/util';
import Definition from '../definition/definition';
import DuplicateStructureNameError from './duplicate-structure-name-error';
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
        const structure = this.definition.structure as Record<
            string,
            ModelDefinition
        >;
        const errors: Error[] = [];
        const nameMap: Map<string, string[]> = this.buildNameMap(structure);
        nameMap.forEach((keys, name) => {
            if (!hasLength(keys, 1)) {
                this.addDuplicateError(errors, name, keys);
            }
        });
        return errors;
    }

    private buildNameMap(structure: Record<string, ModelDefinition>) {
        const nameMap: Map<string, string[]> = new Map<string, string[]>();
        Object.keys(structure).forEach((key) => {
            const name = structure[key].name;
            if (!nameMap.has(name)) {
                nameMap.set(name, []);
            }
            nameMap.get(name)!.push(key);
        });
        return nameMap;
    }

    private addDuplicateError(errors: Error[], name: string, keys: string[]) {
        errors.push(
            new DuplicateStructureNameError(this.definition.name, name, keys)
        );
    }
}
