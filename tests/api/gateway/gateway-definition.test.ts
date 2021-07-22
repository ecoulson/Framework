import { mocked } from 'ts-jest/utils';
import EntryPointDefinition from '../../../src/api/entry-point/entry-point-definition';
import GatewayDefinition from '../../../src/api/gateway/gateway-definition';
import InvalidDefinitionNameError from '../../../src/api/name/invalid-name-error';
import NoEntryPointDefinitionsError from '../../../src/api/gateway/no-entry-point-definitions-error';

jest.mock('../../../src/api/entry-point/entry-point-definition');

describe('Gateway Definition Test Suite', () => {
    const TEST_GATEWAY_NAME = 'TestGateway';
    const TEST_ENTRY_POINT_NAME = 'TestEntryPoint';
    const EMPTY_GATEWAY_NAME = '';
    const INVALID_GATEWAY_NAME = 'Foo Bar###';
    const EntryPointDefinitionMock = mocked(EntryPointDefinition, true);

    beforeEach(() => {
        EntryPointDefinitionMock.mockReset();
        EntryPointDefinitionMock.prototype.validate.mockReset();
    });

    test('When validating a gateway with entry points it should return an empty list', () => {
        EntryPointDefinitionMock.prototype.validate.mockReturnValue([]);

        const entryPointDefinition = new EntryPointDefinition({
            name: TEST_ENTRY_POINT_NAME,
            methods: [],
        });
        const definition = new GatewayDefinition({
            name: TEST_GATEWAY_NAME,
            entryPointDefinitions: [entryPointDefinition],
        });

        expect(definition.validate()).toEqual([]);
        expect(definition.entryPoints).toEqual([entryPointDefinition]);
    });

    test('When validating a gateway with no entry points it should return a list containing a no entry point definitions error', () => {
        const definition = new GatewayDefinition({
            name: TEST_GATEWAY_NAME,
            entryPointDefinitions: [],
        });

        expect(definition.validate()).toEqual([
            new NoEntryPointDefinitionsError(TEST_GATEWAY_NAME),
        ]);
    });

    test('When validating a gateway with an invalid entry point it should return a list containing the errors from the entry point definition', () => {
        EntryPointDefinitionMock.prototype.validate.mockReturnValue([
            new Error('Error from sub definitions'),
        ]);
        const entryPointDefinition = new EntryPointDefinition({
            name: TEST_ENTRY_POINT_NAME,
            methods: [],
        });
        const definition = new GatewayDefinition({
            name: TEST_GATEWAY_NAME,
            entryPointDefinitions: [entryPointDefinition],
        });

        expect(definition.validate()).toEqual([
            new Error('Error from sub definitions'),
        ]);
    });

    test('When validating a gateway with an empty name it should return a list containing an invalid gateway name error', () => {
        EntryPointDefinitionMock.prototype.validate.mockReturnValue([]);

        const definition1 = new GatewayDefinition({
            name: EMPTY_GATEWAY_NAME,
            entryPointDefinitions: [
                new EntryPointDefinition({
                    name: TEST_ENTRY_POINT_NAME,
                    methods: [],
                }),
            ],
        });
        const definition2 = new GatewayDefinition({
            name: INVALID_GATEWAY_NAME,
            entryPointDefinitions: [
                new EntryPointDefinition({
                    name: TEST_ENTRY_POINT_NAME,
                    methods: [],
                }),
            ],
        });

        expect(definition1.validate()).toEqual([
            new InvalidDefinitionNameError(
                EMPTY_GATEWAY_NAME,
                new RegExp(/^(?:[a-zA-z_-])+$/)
            ),
        ]);
        expect(definition2.validate()).toEqual([
            new InvalidDefinitionNameError(
                INVALID_GATEWAY_NAME,
                new RegExp(/^(?:[a-zA-z_-])+$/)
            ),
        ]);
    });
});
