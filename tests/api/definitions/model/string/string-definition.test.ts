import { mocked } from 'ts-jest/utils';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';
import RuleDefinition from '../../../../../src/api/definitions/rule/rule-definition';

jest.mock('../../../../../src/api/definitions/rule/rule-definition');

describe('String Definition Test Suite', () => {
    const STRING_DEFINITION_NAME = 'StringDefinition';
    const MockRuleDefinition = mocked(RuleDefinition, true);

    beforeEach(() => {
        MockRuleDefinition.mockReset();
        MockRuleDefinition.prototype.validate.mockReset();
    });

    test('When creating a valid string definition it should return an empty list', () => {
        MockRuleDefinition.prototype.validate.mockReturnValue([]);

        const definition = new StringDefinition({
            name: STRING_DEFINITION_NAME,
            rules: [],
        });

        expect(definition.validate()).toEqual([]);
    });
});
