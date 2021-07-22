import { mocked } from 'ts-jest/utils';
import EntryPointMethodDefinition from '../../../src/api/entry-point-method/entry-point-method-definition';
import ObjectDefinition from '../../../src/api/model-definition/object-definition/object-definition';
import FunctionProtocol from '../../../src/api/protocol/function-protocol';

jest.mock(
    '../../../src/api/model-definition/object-definition/object-definition'
);

describe('Entry Point Method Definition Test Suite', () => {
    const MockObjectDefinition = mocked(ObjectDefinition, true);
    const TEST_ENTRY_POINT_NAME = 'TestEntryPoint';
    const MODEL_NAME = 'TestModel';

    beforeEach(() => {
        MockObjectDefinition.mockReset();
        MockObjectDefinition.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {
        MockObjectDefinition.prototype.validate.mockReturnValue([]);
        const input = new ObjectDefinition({
            name: MODEL_NAME,
            structure: {},
            rules: [],
        });
        const output = new ObjectDefinition({
            name: MODEL_NAME,
            structure: {},
            rules: [],
        });
        const protocol = new FunctionProtocol();

        const definition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_NAME,
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
        MockObjectDefinition.prototype.validate.mockReturnValue([
            new Error('Error from sub definition'),
        ]);
        const definition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_NAME,
            input: new ObjectDefinition({
                name: MODEL_NAME,
                structure: {},
                rules: [],
            }),
            output: new ObjectDefinition({
                name: MODEL_NAME,
                structure: {},
                rules: [],
            }),
            protocol: new FunctionProtocol(),
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definition'),
            new Error('Error from sub definition'),
        ]);
    });
});
