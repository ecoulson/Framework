import { mocked } from 'ts-jest/utils';
import IllegalDefinitionTypeError from '../../../../../src/api/definitions/model/common/illegal-definition-type-error';
import ObjectDefinition from '../../../../../src/api/definitions/model/object/object-definition';
import ObjectDuplicateNameMap from '../../../../../src/api/definitions/model/object/object-duplicate-name-map';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';

jest.mock('../../../../../src/api/definitions/model/string/string-definition');
jest.mock('../../../../../src/api/definitions/model/object/object-duplicate-name-map');

describe('Object Definition Test Suite', () => {
    const OBJECT_DEFINITION_NAME = 'ObjectDefinitionName';
    const MockStringDefinition = mocked(StringDefinition, true);
    const MockObjectDuplicateNameMap = mocked(ObjectDuplicateNameMap, true);

    beforeEach(() => {
        MockStringDefinition.mockReset();
        MockStringDefinition.prototype.validate.mockReset();
        MockObjectDuplicateNameMap.mockReset();
        MockObjectDuplicateNameMap.prototype.generateDuplicateErrorsForObjectDefinition.mockReset();
    });

    test('When validating an object definition with an invalid structure type it should return a list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([new Error()]);
        MockObjectDuplicateNameMap.prototype.generateDuplicateErrorsForObjectDefinition.mockReturnValue(
            []
        );

        const definition = new ObjectDefinition({
            name: OBJECT_DEFINITION_NAME,
            structure: null as any,
            rules: [],
        });

        expect(definition.validate()).toEqual([
            new IllegalDefinitionTypeError(
                `The structure of object definition "${OBJECT_DEFINITION_NAME}" is not of type Record<string, ModelDefinition>. Please check that you have provided the correct structure`
            ),
        ]);
    });

    test('When validating an object definition with invalid model definitions in the structure it should return a list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([new Error()]);
        MockObjectDuplicateNameMap.prototype.generateDuplicateErrorsForObjectDefinition.mockReturnValue(
            []
        );

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
