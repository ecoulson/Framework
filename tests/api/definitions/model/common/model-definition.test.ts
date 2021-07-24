import { mocked } from 'ts-jest/utils';
import ModelDefinition from '../../../../../src/api/definitions/model/common/model-definition';
import ModelType from '../../../../../src/api/definitions/model/common/model-type';
import PrimativeDefinitionType from '../../../../../src/api/definitions/model/primative/primative-definition-type';
import RuleDefinition from '../../../../../src/api/definitions/rule/rule-definition';

jest.mock('../../../../../src/api/definitions/rule/rule-definition');

class ModelDefinitionStub extends ModelDefinition {
    protected validateStructure(): Error[] {
        return [];
    }

    protected validateStructureType() {
        return [];
    }
}

describe('Model Definition Test Suite', () => {
    const MODEL_NAME = 'TestModel';
    const RULE_NAME = 'TestRule';
    const MockRuleDefinition = mocked(RuleDefinition, true);

    beforeEach(() => {
        MockRuleDefinition.mockReset();
        MockRuleDefinition.prototype.validate.mockReset();
    });

    test('When validating a model definition with primative structure and rules should return an empty list', () => {
        const model = new ModelDefinitionStub({
            rules: [],
            structure: PrimativeDefinitionType.STRING,
            type: ModelType.STRING,
            name: MODEL_NAME,
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with no duplicate keys pairs it should return an empty list', () => {
        const model = new ModelDefinitionStub({
            name: MODEL_NAME,
            rules: [],
            structure: new ModelDefinitionStub({
                name: 'A',
                rules: [],
                structure: {
                    a: new ModelDefinitionStub({
                        name: 'B',
                        rules: [],
                        structure: PrimativeDefinitionType.STRING,
                        type: ModelType.STRING,
                    }),
                },
                type: ModelType.OBJECT,
            }),
            type: ModelType.EXTENSION,
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with an invalid rule it should return a list containing the errors from the rule', () => {
        MockRuleDefinition.prototype.validate.mockReturnValue([new Error('Rule errors')]);

        const model = new ModelDefinitionStub({
            name: MODEL_NAME,
            structure: PrimativeDefinitionType.STRING,
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
