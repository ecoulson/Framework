import { isEmpty } from '../../common/util';
import Definition from '../definition';
import EntryPointDefintion from '../entry-point/entry-point-definition';
import GatewayDefinitionInterface from './gateway-definition.interface';
import InvalidGatewayNameError from './invalid-gateway-name-error';
import NoEntryPointDefinitionsError from './no-entry-point-definitions-error';

export default class GatewayDefinition extends Definition {
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
        if (isEmpty(this.name)) {
            errors.push(new InvalidGatewayNameError(this.name));
        }
        if (isEmpty(this.entryPoints)) {
            errors.push(new NoEntryPointDefinitionsError(this.name));
        }
        this.entryPoints.forEach((entryPoint) =>
            errors.push(...entryPoint.validate())
        );
        return errors;
    }
}
