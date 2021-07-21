import RuleInterface from "./rule.interface";

export default class Rule<T> {
    constructor(private ruleDefinition: RuleInterface) {}

    abstract validate(arguments: T): void;
}
