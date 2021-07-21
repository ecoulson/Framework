import { mocked } from 'ts-jest/utils';
import NoRuleError from '../../../src/api/rule-definition/no-rule-error';
import RuleDefinition from '../../../src/api/rule-definition/rule-definition';
import RuleType from '../../../src/api/rule-definition/rule-type';
import RuleRegistry from '../../../src/api/rule/rule-registry';

jest.mock('../../../src/api/rule/rule-registry');

describe('Rule Definition Test', () => {
    const MockedRuleRegistry = mocked(RuleRegistry, true);
    const UNREGISTERED_RULE_NAME = 'TestRule';

    beforeEach(() => {
        MockedRuleRegistry.mockReset();
    });

    test('When creating a rule definition thats not registered then a list with an error should be returned', () => {
        MockedRuleRegistry.hasRule.mockImplementation(() => false);

        const definition = new RuleDefinition<{}>({
            name: UNREGISTERED_RULE_NAME,
            ruleName: UNREGISTERED_RULE_NAME,
            argument: {},
            type: RuleType.MODEL,
        });

        expect(definition.validate()).toEqual([
            new NoRuleError(UNREGISTERED_RULE_NAME),
        ]);
    });

    test('When creating a rule definition thats registered then an empty list should be returned', () => {
        MockedRuleRegistry.hasRule.mockImplementation(() => true);

        const definition = new RuleDefinition<{}>({
            name: UNREGISTERED_RULE_NAME,
            ruleName: UNREGISTERED_RULE_NAME,
            argument: {},
            type: RuleType.MODEL,
        });

        expect(definition.validate()).toEqual([]);
    });
});
