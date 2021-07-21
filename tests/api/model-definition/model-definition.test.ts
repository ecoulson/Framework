import { mocked } from 'ts-jest/utils';
import EntryPointMethodDefinition from '../../../src/api/entry-point-method/entry-point-method-definition';
import EntryPointDefintion from '../../../src/api/entry-point/entry-point-definition';
import ModelDefinition from '../../../src/api/model-definition/model-definition';
import FunctionProtocol from '../../../src/api/protocol/function-protocol';

describe('Model Definition', () => {
    const EntryPointMethodDefinitionMock = mocked(
        EntryPointMethodDefinition,
        true
    );
    const TEST_ENTRY_POINT_DEFINITION = 'TestEntryPoint';
    const TEST_ENTRY_POINT_METHOD_DEFINITION = 'TestEntryPointMethod';
    const MODEL_DEFINITION = 'TestModel';

    beforeEach(() => {
        EntryPointMethodDefinitionMock.mockReset();
        EntryPointMethodDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {
        const methodDefinition = new EntryPointMethodDefinition({
            name: TEST_ENTRY_POINT_METHOD_DEFINITION,
            protocol: new FunctionProtocol(),
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
        });

        const definition = new EntryPointDefintion({
            name: TEST_ENTRY_POINT_DEFINITION,
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
            name: TEST_ENTRY_POINT_DEFINITION,
            methods: [
                new EntryPointMethodDefinition({
                    name: TEST_ENTRY_POINT_METHOD_DEFINITION,
                    protocol: new FunctionProtocol(),
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
                }),
            ],
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definition'),
        ]);
    });
});
