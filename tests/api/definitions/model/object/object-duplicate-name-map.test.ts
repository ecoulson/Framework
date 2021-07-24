import ModelDefinition from '../../../../../src/api/definitions/model/common/model-definition';
import ModelType from '../../../../../src/api/definitions/model/common/model-type';
import DuplicateObjectNameError from '../../../../../src/api/definitions/model/object/duplicate-object-name-error';
import ObjectDuplicateNameMap from '../../../../../src/api/definitions/model/object/object-duplicate-name-map';
import PrimativeDefinitionType from '../../../../../src/api/definitions/model/primative/primative-definition-type';

class ModelDefinitionStub extends ModelDefinition {
    constructor(name: string) {
        super({
            name,
            structure: PrimativeDefinitionType.STRING,
            type: ModelType.STRING,
            rules: [],
        });
    }

    protected validateStructure(): Error[] {
        return [];
    }

    protected validateStructureType() {
        return [];
    }
}

describe('Object Duplicate Name Map Test Suite', () => {
    const NAME = 'name';

    test('Should create a name map with valid name key pairs', () => {
        const map = new ObjectDuplicateNameMap({
            name: NAME,
            structure: {
                a: new ModelDefinitionStub('A'),
                b: new ModelDefinitionStub('B'),
                c: new ModelDefinitionStub('C'),
            },
        } as any);

        expect(map.generateDuplicateErrorsForObjectDefinition()).toEqual([]);
    });

    test('Should create a name map with invalid name key pairs', () => {
        const map = new ObjectDuplicateNameMap({
            name: NAME,
            structure: {
                a: new ModelDefinitionStub('A'),
                b: new ModelDefinitionStub('A'),
                c: new ModelDefinitionStub('C'),
            },
        } as any);

        expect(map.generateDuplicateErrorsForObjectDefinition()).toEqual([
            new DuplicateObjectNameError(NAME, {
                name: 'A',
                keys: ['a', 'b'],
            }),
        ]);
    });
});
