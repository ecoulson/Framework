import { mocked } from 'ts-jest/utils';
import ModelDefinition from '../../../src/api/model-definition/model-definition';

jest.mock('../../../src/api/model-definition/model-definition');

describe('Model Definition', () => {
    const ModelDefinitionMock = mocked(ModelDefinition, true);
    const MODEL_DEFINITION = 'TestModel';

    beforeEach(() => {
        ModelDefinitionMock.mockReset();
        ModelDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating an entry point with valid entry point methods it should return an empty list', () => {});
});
