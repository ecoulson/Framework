import Definition from '../definition/definition';
import RuleDefinitionInterface from './rule-definition.interface';

export default class RuleDefinition<ArgType> extends Definition<
    RuleDefinitionInterface<ArgType>
> {
    get arg(): ArgType {
        return this.definition.argument;
    }

    get ruleName(): string {
        return this.definition.ruleName;
    }

    protected validateDefinition(): Error[] {
        throw new Error('Method not implemented.');
    }
}
