import { mocked } from 'ts-jest/utils';
import RawDefinitionType from '../../../../../src/api/definitions/model/common/raw-definition-type';
import ListDefinition from '../../../../../src/api/definitions/model/list/list-definition';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';

jest.mock('../../../../../src/api/definitions/model/string/string-definition');

describe('List Definition Test Suite', () => {
    const LIST_DEFINITION_NAME = 'ListDefinition';
    const MockStringDefinition = mocked(StringDefinition, true);

    beforeEach(() => {
        MockStringDefinition.mockReset();
        MockStringDefinition.prototype.validate.mockReset();
    });

    test('When validating a list of raw type elements it should return an empty list', () => {
        const definition = new ListDefinition({
            name: LIST_DEFINITION_NAME,
            elementType: RawDefinitionType.String,
            rules: [],
        });

        expect(definition.validate()).toEqual([]);
    });

    test('When validating an invalid list of model definition elements it should return a list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([new Error('Error in string')]);

        const definition = new ListDefinition({
            name: LIST_DEFINITION_NAME,
            elementType: new StringDefinition({
                name: 'A',
                rules: [],
            }),
            rules: [],
        });

        expect(definition.validate()).toEqual([new Error('Error in string')]);
    });
});
