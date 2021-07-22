import { doesMatchRegex } from '../../../common/util';
import InvalidNameError from './invalid-name-error';

export default class Name {
    private static readonly NAME_PATTERN = new RegExp(/^(?:[a-zA-z_-])+$/);

    constructor(private name: string) {}

    public get value(): string {
        return this.name;
    }

    public validate(): Error[] {
        if (this.isValid()) {
            return [];
        }
        return [this.getInvalidNameError()];
    }

    private isValid(): boolean {
        return doesMatchRegex(this.name, Name.NAME_PATTERN);
    }

    private getInvalidNameError() {
        return new InvalidNameError(this.name, Name.NAME_PATTERN);
    }
}
