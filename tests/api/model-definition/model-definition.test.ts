import { mocked } from 'ts-jest/utils';
import DuplicateStructureNameError from '../../../src/api/model-definition/duplicate-structure-name-error';
import ListDefinition from '../../../src/api/model-definition/list-definition';
import StringDefinition from '../../../src/api/model-definition/string-definition';
import RuleDefinition from '../../../src/api/rule-definition/rule-definition';
import ModelType from '../../../src/api/model-definition/model-type';
import ExtensionDefinition from '../../../src/api/model-definition/extension-definition';
import ObjectDefinition from '../../../src/api/model-definition/object-definition';

jest.mock('../../../src/api/rule-definition/rule-definition');
jest.mock('../../../src/api/model-definition/list-definition');

describe('Model Definition', () => {
    const MODEL_NAME = 'TestModel';
    const RULE_NAME = 'TestRule';
    const MockRuleDefinition = mocked(RuleDefinition, true);
    const MockListDefinition = mocked(ListDefinition, true);

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
            extendedModel: {
                a: new StringDefinition({
                    name: 'A',
                    rules: [],
                }),
            },
            rules: [],
        });

        expect(model.validate()).toEqual([]);
        expect(model.type).toEqual(ModelType.EXTENSION);
    });

    test('When validating a model definition with duplicate names it should return a list containing a duplicate name error', () => {
        const model = new ObjectDefinition({
            name: MODEL_NAME,
            structure: {
                a: new StringDefinition({
                    name: 'A',
                    rules: [],
                }),
                b: new StringDefinition({
                    name: 'A',
                    rules: [],
                }),
            },
            rules: [],
        });

        expect(model.validate()).toEqual([
            new DuplicateStructureNameError(MODEL_NAME, {
                name: 'A',
                keys: ['a', 'b'],
            }),
        ]);
    });

    test('When validating a model definition with an invalid list as the structure then it should return a list containing an error from the list', () => {
        MockListDefinition.prototype.validate.mockReturnValue([
            new Error('List errors'),
        ]);
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
        MockRuleDefinition.prototype.validate.mockReturnValue([
            new Error('Rule errors'),
        ]);

        const model = new ExtensionDefinition({
            name: MODEL_NAME,
            extendedModel: new StringDefinition({
                name: 'B',
                rules: [],
            }),
            rules: [
                new RuleDefinition<{}>({
                    name: RULE_NAME,
                    ruleName: RULE_NAME,
                    argument: {},
                    type: ModelType.STRING,
                }),
            ],
        });

        expect(model.validate()).toEqual([new Error('Rule errors')]);
    });
});
