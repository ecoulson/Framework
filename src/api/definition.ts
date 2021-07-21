import { doesMatchRegex } from '../common/util';
import DefinitionInterface from './definition.interface';
import InvalidGatewayNameError from './gateway/invalid-gateway-name-error';

export default abstract class Definition<T extends DefinitionInterface> {
    private static readonly DEFINITION_NAME_PATTERN = new RegExp(
        /^(?:[a-zA-z_-])+$/
    );

    constructor(protected definition: T) {}

    public get name(): string {
        return this.definition.name;
    }

    public validate(): Error[] {
        return [...this.validateName(), ...this.validateDefinition()];
    }

    private validateName(): Error[] {
        if (!this.isValidName()) {
            return [];
        }
        return [this.getInvalidNameError()];
    }

    private isValidName() {
        return !doesMatchRegex(this.name, Definition.DEFINITION_NAME_PATTERN);
    }

    private getInvalidNameError() {
        return new InvalidGatewayNameError(
            this.name,
            Definition.DEFINITION_NAME_PATTERN
        );
    }

    protected abstract validateDefinition(): Error[];
}
