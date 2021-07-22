export default class NoRuleError extends Error {
    constructor(ruleName: string) {
        super(
            `No rule is registered with the name ${ruleName}. Did you forget to register a custom rule?`
        );
        this.name = 'NoRuleError';
    }
}
