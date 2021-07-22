import NumberDefinition from '../../../../../src/api/definitions/model/number/number-definition';

describe('Number Definition Test Suite', () => {
    const NUMBER_DEFINITION_NAME = 'NumberDefinition';

    test('When creating a valid number definition it should return an empty list', () => {
        const definition = new NumberDefinition({
            name: NUMBER_DEFINITION_NAME,
            rules: [],
        });

        expect(definition.validate()).toEqual([]);
    });
});
