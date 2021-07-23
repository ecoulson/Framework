import { mocked } from 'ts-jest/utils';
import ObjectDefinition from '../../../../../src/api/definitions/model/object/object-definition';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';

jest.mock('../../../../../src/api/definitions/model/string/string-definition');

describe('Object Definition Test Suite', () => {
    const OBJECT_DEFINITION_NAME = 'ObjectDefinitionName';
    const MockStringDefinition = mocked(StringDefinition, true);

    beforeEach(() => {
        MockStringDefinition.mockReset();
        MockStringDefinition.prototype.validate.mockReset();
    });

    test('When validating an object definition with invalid model definitions in the structure it should return a list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([new Error()]);

        const definition = new ObjectDefinition({
            name: OBJECT_DEFINITION_NAME,
            structure: {
                A: new StringDefinition({
                    name: 'B',
                    rules: [],
                }),
            },
            rules: [],
        });

        expect(definition.validate()).toEqual([new Error()]);
    });
});
