import ClassGenerator from '../codegen/class-generator';
import Generator from '../generator';
import GatewayDefinition from './gateway-definition';

export default class GatewayGenerator extends Generator {
    constructor(private gatewayDefinition: GatewayDefinition) {
        super();
    }

    generate(): string {
        const classGenerator = new ClassGenerator();

        this.gatewayDefinition.entryPoints

        return classGenerator.generate();
    }
}
