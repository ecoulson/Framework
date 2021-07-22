import BooleanDefinition from "../../../src/api/model-definition/boolean-definition/boolean-definition";

describe('Boolean Definition Test Suite', () => {
    test('When validating a valid boolean definition it should return an empty list', () => {
        const definition = new BooleanDefinition({
            name: 'Test',
        });

        expect(definition.validate()).toEqual([]);
    });
});
