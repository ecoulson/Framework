import IllegalDefinitionTypeError from '../../../../../src/api/definitions/model/common/illegal-definition-type-error';
import ModelType from '../../../../../src/api/definitions/model/common/model-type';
import PrimativeDefinition from '../../../../../src/api/definitions/model/primative/primative-definition';
import PrimativeDefinitionType from '../../../../../src/api/definitions/model/primative/primative-definition-type';

class FakePrimativeDefinition extends PrimativeDefinition {}

describe('Primative Definition Test Suite', () => {
    const PRIMATIVE_DEFINTIION_NAME = 'PrimativeDefinitionTest';

    test('When validating a primative definition with no errors return a list with no errors', () => {
        const definition = new FakePrimativeDefinition({
            name: PRIMATIVE_DEFINTIION_NAME,
            primative: PrimativeDefinitionType.STRING,
            rules: [],
            type: ModelType.STRING,
        });

        expect(definition.validate()).toEqual([]);
    });

    test('When validating a primative definition with an invalid primative type it should return a list of errors', () => {
        const definition = new FakePrimativeDefinition({
            name: PRIMATIVE_DEFINTIION_NAME,
            primative: new Object() as any,
            rules: [],
            type: ModelType.STRING,
        });

        expect(definition.validate()).toEqual([
            new IllegalDefinitionTypeError(
                `Primative definition "${PRIMATIVE_DEFINTIION_NAME}" must be a primative type`
            ),
        ]);
    });
});
