import { mocked } from 'ts-jest/utils';
import EntryPointMethodDefinition from '../../../src/api/entry-point-method/entry-point-method-definition';
import ModelDefinition from '../../../src/api/model-definition/model-definition';
import FunctionProtocol from '../../../src/api/protocol/function-protocol';

jest.mock('../../../src/api/model-definition/model-definition');

describe('Entry Point Method Definition', () => {
    const ModelDefinitionMock = mocked(ModelDefinition, true);
    const TEST_ENTRY_POINT_DEFINITION = 'TestEntryPoint';
    const MODEL_DEFINITION = 'TestModel';

    beforeEach(() => {
        ModelDefinitionMock.mockReset();
        ModelDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {
        ModelDefinitionMock.prototype.validate.mockImplementation(() => []);
        const input = new ModelDefinition({
            name: MODEL_DEFINITION,
            structure: {},
            rule: [],
        });
        const output = new ModelDefinition({
            name: MODEL_DEFINITION,
            structure: {},
            rule: [],
        });
        const protocol = new FunctionProtocol();

        const definition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_DEFINITION,
            input,
            output,
            protocol,
        });

        expect(definition.validate()).toEqual([]);
        expect(definition.input).toEqual(input);
        expect(definition.output).toEqual(output);
        expect(definition.protocol).toEqual(protocol);
    });

    test('When validating an entry point with an invalid model definition it should return a list containing the errors from the model definition', () => {
        ModelDefinitionMock.prototype.validate.mockImplementation(() => [
            new Error('Error from sub definition'),
        ]);
        const definition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_DEFINITION,
            input: new ModelDefinition({
                name: MODEL_DEFINITION,
                structure: {},
                rule: [],
            }),
            output: new ModelDefinition({
                name: MODEL_DEFINITION,
                structure: {},
                rule: [],
            }),
            protocol: new FunctionProtocol(),
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definition'),
            new Error('Error from sub definition'),
        ]);
    });
});
