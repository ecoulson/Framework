import ModelDefinition from '../../../../../src/api/definitions/model/common/model-definition';
import ModelType from '../../../../../src/api/definitions/model/common/model-type';
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

    protected validateModel(): Error[] {
        return [];
    }
}

describe('Object Duplicate Name Map Test Suite', () => {
    const NAME = 'name';

    test('Should create a name map with valid name key pairs', () => {
        const map = new ObjectDuplicateNameMap({
            a: new ModelDefinitionStub('A'),
            b: new ModelDefinitionStub('B'),
            c: new ModelDefinitionStub('C'),
        });

        expect(map.generateDuplicateErrorsForObjectDefinition(NAME)).toEqual([]);
    });
});
