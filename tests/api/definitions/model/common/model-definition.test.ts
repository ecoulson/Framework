import { mocked } from 'ts-jest/utils';
import ModelDefinition from '../../../../../src/api/definitions/model/common/model-definition';
import ModelType from '../../../../../src/api/definitions/model/common/model-type';
import RawDefinitionType from '../../../../../src/api/definitions/model/common/raw-definition-type';
import ExtensionDefinition from '../../../../../src/api/definitions/model/extension/extension-definition';
import ListDefinition from '../../../../../src/api/definitions/model/list/list-definition';
import ObjectDefinition from '../../../../../src/api/definitions/model/object/object-definition';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';
import RuleDefinition from '../../../../../src/api/definitions/rule/rule-definition';

jest.mock('../../../../../src/api/definitions/rule/rule-definition');
jest.mock('../../../../../src/api/definitions/model/list/list-definition');
jest.mock('../../../../../src/api/definitions/model/string/string-definition');
jest.mock('../../../../../src/api/definitions/model/extension/extension-definition');
jest.mock('../../../../../src/api/definitions/model/object/object-definition');
jest.mock('../../../../../src/api/definitions/model/object/object-duplicate-name-map');

class MockModelDefinition extends ModelDefinition {
    protected validateModel(): Error[] {
        return [];
    }
}

describe('Model Definition Test Suite', () => {
    const MODEL_NAME = 'TestModel';
    const RULE_NAME = 'TestRule';
    const MockRuleDefinition = mocked(RuleDefinition, true);
    const MockListDefinition = mocked(ListDefinition, true);
    const MockStringDefinition = mocked(StringDefinition, true);
    const MockExtensionDefinition = mocked(ExtensionDefinition, true);
    const MockObjectDefinition = mocked(ObjectDefinition, true);

    beforeAll(() => {
        MockStringDefinition.prototype.validate.mockReturnValue([]);
        MockExtensionDefinition.prototype.validate.mockReturnValue([]);
        MockObjectDefinition.prototype.validate.mockReturnValue([]);
    });

    beforeEach(() => {
        MockRuleDefinition.mockReset();
        MockRuleDefinition.prototype.validate.mockReset();
        MockListDefinition.mockReset();
        MockListDefinition.prototype.validate.mockReset();
    });

    test('When validating a model definition with primative structure and rules should return an empty list', () => {
        const model = new StringDefinition({
            rules: [],
            name: MODEL_NAME,
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with no duplicate keys pairs it should return an empty list', () => {
        const model = new ExtensionDefinition({
            name: MODEL_NAME,
            extendedModel: new ObjectDefinition({
                name: 'A',
                structure: {
                    a: new StringDefinition({
                        name: 'B',
                        rules: [],
                    }),
                },
                rules: [],
            }),
            rules: [],
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with an invalid list as the structure then it should return a list containing an error from the list', () => {
        MockListDefinition.prototype.validate.mockReturnValue([new Error('List errors')]);
        const model = new ListDefinition({
            name: 'A',
            elementType: new StringDefinition({
                name: 'B',
                rules: [],
            }),
            rules: [],
        });

        expect(model.validate()).toEqual([new Error('List errors')]);
    });

    test('When validating a model definition with an invalid rule it should return a list containing the errors from the rule', () => {
        MockRuleDefinition.prototype.validate.mockReturnValue([new Error('Rule errors')]);

        const model = new MockModelDefinition({
            name: MODEL_NAME,
            structure: RawDefinitionType.String,
            rules: [
                new RuleDefinition<{}>({
                    name: RULE_NAME,
                    ruleName: RULE_NAME,
                    argument: {},
                    type: ModelType.STRING,
                }),
            ],
            type: ModelType.STRING,
        });

        expect(model.validate()).toEqual([new Error('Rule errors')]);
        expect(model.type).toEqual(ModelType.STRING);
    });
});
