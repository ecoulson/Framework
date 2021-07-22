import { mocked } from 'ts-jest/utils';
import NumberDefinition from '../../../../../src/api/definitions/model/number/number-definition';
import RuleDefinition from '../../../../../src/api/definitions/rule/rule-definition';

describe('Number Definition Test Suite', () => {
    const NUMBER_DEFINITION_NAME = 'NumberDefinition';
    const MockRuleDefinition = mocked(RuleDefinition, true);

    beforeEach(() => {
        MockRuleDefinition.mockReset();
        MockRuleDefinition.prototype.validate.mockReset();
    });

    test('When creating a valid number definition it should return an empty list', () => {
        MockRuleDefinition.prototype.validate.mockReturnValue([]);

        const definition = new NumberDefinition({
            name: NUMBER_DEFINITION_NAME,
            rules: [],
        });

        expect(definition.validate()).toEqual([]);
    });
});
