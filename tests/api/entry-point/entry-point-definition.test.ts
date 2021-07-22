import { mocked } from 'ts-jest/utils';
import EntryPointMethodDefinition from '../../../src/api/entry-point-method/entry-point-method-definition';
import EntryPointDefintion from '../../../src/api/entry-point/entry-point-definition';
import ObjectDefinition from '../../../src/api/model-definition/object-definition';
import FunctionProtocol from '../../../src/api/protocol/function-protocol';

jest.mock('../../../src/api/entry-point-method/entry-point-method-definition');
jest.mock('../../../src/api/model-definition/model-definition');

describe('Entry Point Definition', () => {
    const EntryPointMethodDefinitionMock = mocked(
        EntryPointMethodDefinition,
        true
    );
    const TEST_ENTRY_POINT_NAME = 'TestEntryPoint';
    const TEST_ENTRY_POINT_METHOD_NAME = 'TestEntryPointMethod';
    const MODEL_NAME = 'TestModel';

    beforeEach(() => {
        EntryPointMethodDefinitionMock.mockReset();
        EntryPointMethodDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {
        const methodDefinition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_METHOD_NAME,
            protocol: new FunctionProtocol(),
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
        });

        const definition = new EntryPointDefintion({
            name: TEST_ENTRY_POINT_NAME,
            methods: [methodDefinition],
        });

        expect(definition.validate()).toEqual([]);
        expect(definition.methods).toEqual([methodDefinition]);
    });

    test('When validating an entry point with an invalid entry point method it should return a list containing the errors from the entry point method definition', () => {
        EntryPointMethodDefinitionMock.prototype.validate.mockImplementation(
            () => {
                return [new Error('Error from sub definition')];
            }
        );
        const definition = new EntryPointDefintion({
            name: TEST_ENTRY_POINT_NAME,
            methods: [
                new EntryPointMethodDefinition({
                    name: TEST_ENTRY_POINT_METHOD_NAME,
                    protocol: new FunctionProtocol(),
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
                }),
            ],
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definition'),
        ]);
    });
});
