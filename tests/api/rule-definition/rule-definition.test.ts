import { mocked } from 'ts-jest/utils';
import ModelType from '../../../src/api/model-definition/common/model-type';
import NoRuleError from '../../../src/api/rule-definition/no-rule-error';
import RuleDefinition from '../../../src/api/rule-definition/rule-definition';
import RuleRegistry from '../../../src/api/rule/rule-registry';

jest.mock('../../../src/api/rule/rule-registry');

describe('Rule Definition Test Suite', () => {
    const MockedRuleRegistry = mocked(RuleRegistry, true);
    const RULE_NAME = 'TestRule';

    beforeEach(() => {
        MockedRuleRegistry.mockReset();
    });

    test('When creating a rule definition thats not registered then a list with an error should be returned', () => {
        MockedRuleRegistry.hasRule.mockImplementation(() => false);

        const definition = new RuleDefinition<{}>({
            name: RULE_NAME,
            ruleName: RULE_NAME,
            argument: {},
            type: ModelType.OBJECT,
        });

        expect(definition.validate()).toEqual([new NoRuleError(RULE_NAME)]);
    });

    test('When creating a rule definition thats registered then an empty list should be returned', () => {
        MockedRuleRegistry.hasRule.mockImplementation(() => true);

        const definition = new RuleDefinition<{}>({
            name: RULE_NAME,
            ruleName: RULE_NAME,
            argument: {},
            type: ModelType.OBJECT,
        });

        expect(definition.validate()).toEqual([]);
        expect(definition.arg).toEqual({});
        expect(definition.type).toEqual(ModelType.OBJECT),
            expect(definition.ruleName).toEqual(RULE_NAME);
    });
});
