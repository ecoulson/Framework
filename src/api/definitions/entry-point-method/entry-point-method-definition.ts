import Protocol from '../../protocol/protocol';
import Definition from '../common/definition';
import ModelDefinition from '../model/common/model-definition';
import EntryPointMethodDefinitionInterface from './entry-point-method-definition.interface';

export default class EntryPointMethodDefinition extends Definition<EntryPointMethodDefinitionInterface> {
    public get input(): ModelDefinition {
        return this.definition.input;
    }

    public get output(): ModelDefinition {
        return this.definition.output;
    }

    public get protocol(): Protocol {
        return this.definition.protocol;
    }

    protected validateDefinition(): Error[] {
        const errors: Error[] = [];
        errors.push(...this.input.validate(), ...this.output.validate());
        return errors;
    }
}
