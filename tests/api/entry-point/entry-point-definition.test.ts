import { mocked } from 'ts-jest/utils';
import EntryPointMethodDefinition from '../../../src/api/entry-point-method/entry-point-method-definition';
import EntryPointDefintion from '../../../src/api/entry-point/entry-point-definition';

jest.mock('../../../src/api/entry-point-method/entry-point-method-definition');

describe('Entry Point Definition', () => {
    const EntryPointMethodDefinitionMock = mocked(
        EntryPointMethodDefinition,
        true
    );
    const TEST_ENTRY_POINT_DEFINITION = 'TestEntryPoint';
    const TEST_ENTRY_POINT_METHOD_DEFINITION = 'TestEntryPointMethod';

    beforeEach(() => {
        EntryPointMethodDefinitionMock.mockReset();
        EntryPointMethodDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {
        const methodDefinition = new EntryPointMethodDefinition(
            TEST_ENTRY_POINT_METHOD_DEFINITION
        );

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
                new EntryPointMethodDefinition(
                    TEST_ENTRY_POINT_METHOD_DEFINITION
                ),
            ],
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definition'),
        ]);
    });
});
