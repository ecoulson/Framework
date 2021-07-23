import { mocked } from 'ts-jest/utils';
import ExtendingRawTypeError from '../../../../../src/api/definitions/model/extension/extending-raw-type-error';
import ExtensionDefinition from '../../../../../src/api/definitions/model/extension/extension-definition';
import PrimativeDefinitionType from '../../../../../src/api/definitions/model/primative/primative-definition-type';
import StringDefinition from '../../../../../src/api/definitions/model/string/string-definition';

jest.mock('../../../../../src/api/definitions/model/string/string-definition');

describe('Extension Definition Test Suite', () => {
    const EXTENSTION_DEFINITION_NAME = 'ExtensionDefinition';
    const MockStringDefinition = mocked(StringDefinition, true);

    beforeEach(() => {
        MockStringDefinition.mockReset();
        MockStringDefinition.prototype.validate.mockReset();
    });

    test('When validating a valid extension definition it should return an empty list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([]);

        const definition = new ExtensionDefinition({
            name: EXTENSTION_DEFINITION_NAME,
            extendedModel: new StringDefinition({
                name: 'A',
                rules: [],
            }),
            rules: [],
        });

        expect(definition.validate());
    });

    test('When validating an extension definition thats attempting to extend a raw type it should return a list of errors', () => {
        const definition = new ExtensionDefinition({
            name: EXTENSTION_DEFINITION_NAME,
            extendedModel: PrimativeDefinitionType.NUMBER as any,
            rules: [],
        });

        expect(definition.validate()).toEqual([
            new ExtendingRawTypeError(EXTENSTION_DEFINITION_NAME, PrimativeDefinitionType.NUMBER),
        ]);
    });

    test('When validating an invalid extended definition model it should return a list of errors', () => {
        MockStringDefinition.prototype.validate.mockReturnValue([
            new Error('Extended model errors'),
        ]);

        const definition = new ExtensionDefinition({
            name: EXTENSTION_DEFINITION_NAME,
            extendedModel: new StringDefinition({
                name: 'A',
                rules: [],
            }),
            rules: [],
        });

        expect(definition.validate()).toEqual([new Error('Extended model errors')]);
    });
});
