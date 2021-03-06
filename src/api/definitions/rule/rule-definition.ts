import Definition from '../common/definition';
import ModelType from '../model/common/model-type';
import RuleRegistry from '../../rule/rule-registry';
import NoRuleError from './no-rule-error';
import RuleDefinitionInterface from './rule-definition.interface';

export default class RuleDefinition<ArgType> extends Definition<RuleDefinitionInterface<ArgType>> {
    get arg(): ArgType {
        return this.definition.argument;
    }

    get ruleName(): string {
        return this.definition.ruleName;
    }

    get type(): ModelType {
        return this.definition.type;
    }

    protected validateDefinition(): Error[] {
        if (RuleRegistry.hasRule(this.ruleName)) {
            return [];
        }
        return [new NoRuleError(this.ruleName)];
    }
}
