import Name from '../name/name';
import DefinitionInterface from './definition.interface';

export default abstract class Definition<T extends DefinitionInterface> {
    private definitionName: Name;

    constructor(protected definition: T) {
        this.definitionName = new Name(definition.name);
    }

    public get name(): string {
        return this.definitionName.value;
    }

    public validate(): Error[] {
        return [...this.definitionName.validate(), ...this.validateDefinition()];
    }

    protected abstract validateDefinition(): Error[];
}
