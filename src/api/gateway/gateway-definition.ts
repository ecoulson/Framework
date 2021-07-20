import { doesMatchRegex, isEmpty } from '../../common/util';
import Definition from '../definition';
import EntryPointDefintion from '../entry-point/entry-point-definition';
import GatewayDefinitionInterface from './gateway-definition.interface';
import InvalidGatewayNameError from './invalid-gateway-name-error';
import NoEntryPointDefinitionsError from './no-entry-point-definitions-error';

export default class GatewayDefinition extends Definition {
    private static readonly GATEWAY_DEFINITION_PATTERN = new RegExp(
        /^(?:[a-zA-z_-])+$/
    );

    constructor(private definition: GatewayDefinitionInterface) {
        super();
    }

    public get name(): string {
        return this.definition.name;
    }

    public get entryPoints(): EntryPointDefintion[] {
        return this.definition.entryPointDefinitions;
    }

    validate() {
        const errors: Error[] = [];
        if (isEmpty(this.entryPoints)) {
            errors.push(new NoEntryPointDefinitionsError(this.name));
        } else if (this.isValidName()) {
            errors.push(this.getInvalidNameError());
        }
        this.entryPoints.forEach((entryPoint) =>
            errors.push(...entryPoint.validate())
        );
        return errors;
    }

    private isValidName() {
        return !doesMatchRegex(
            this.name,
            GatewayDefinition.GATEWAY_DEFINITION_PATTERN
        );
    }

    private getInvalidNameError() {
        return new InvalidGatewayNameError(
            this.name,
            GatewayDefinition.GATEWAY_DEFINITION_PATTERN
        );
    }
}
