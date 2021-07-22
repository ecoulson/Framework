import Definition from '../definition/definition';
import EntryPointMethodDefinition from '../entry-point-method/entry-point-method-definition';
import EntryPointDefintionInterface from './entry-point-definition.interface';

export default class EntryPointDefintion extends Definition<EntryPointDefintionInterface> {
    get methods(): EntryPointMethodDefinition[] {
        return this.definition.methods;
    }

    protected validateDefinition(): Error[] {
        const errors: Error[] = [];
        this.definition.methods.forEach((method) => {
            errors.push(...method.validate());
        });
        return errors;
    }
}
