import { doesMatchRegex } from '../common/util';
import InvalidGatewayNameError from './gateway/invalid-gateway-name-error';

export default abstract class Definition {
    private static readonly DEFINITION_NAME_PATTERN = new RegExp(
        /^(?:[a-zA-z_-])+$/
    );

    constructor(private definitionName: string) {}

    public get name(): string {
        return this.definitionName;
    }

    public validate(): Error[] {
        return [...this.validateName(), ...this.validateDefinition()];
    }

    private validateName(): Error[] {
        const errors: Error[] = [];
        if (this.isValidName()) {
            errors.push(this.getInvalidNameError());
        }
        return errors;
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
