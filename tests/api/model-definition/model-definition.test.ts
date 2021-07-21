import { mocked } from 'ts-jest/utils';
import DuplicateStructureNameError from '../../../src/api/model-definition/duplicate-structure-name-error';
import ModelDefinition from '../../../src/api/model-definition/model-definition';

describe('Model Definition', () => {
    const MODEL_DEFINITION = 'TestModel';

    beforeEach(() => {});

    test('When validating a model definition with primative structure and rules should return an empty list', () => {
        const model = new ModelDefinition({
            name: MODEL_DEFINITION,
            structure: 'String',
            rules: [],
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with no duplicate keys pairs it should return an empty list', () => {
        const model = new ModelDefinition({
            name: MODEL_DEFINITION,
            structure: {
                a: new ModelDefinition({
                    name: 'A',
                    rules: [],
                    structure: 'String',
                }),
            },
            rules: [],
        });

        expect(model.validate()).toEqual([]);
    });

    test('When validating a model definition with duplicate names it should return a list containing a duplicate name error', () => {
        const model = new ModelDefinition({
            name: MODEL_DEFINITION,
            structure: {
                a: new ModelDefinition({
                    name: 'A',
                    rules: [],
                    structure: 'String',
                }),
                b: new ModelDefinition({
                    name: 'A',
                    rules: [],
                    structure: 'String',
                }),
            },
            rules: [],
        });

        expect(model.validate()).toEqual([
            new DuplicateStructureNameError(MODEL_DEFINITION, 'A', ['a', 'b']),
        ]);
    });
});
