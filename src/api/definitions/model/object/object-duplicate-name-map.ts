import { hasLength } from '../../../../common/util';
import NameKeysDuplicatePair from '../common/name-keys-duplicate-pair';
import DuplicateObjectNameError from './duplicate-object-name-error';
import ObjectDefinition from './object-definition';

export default class ObjectDuplicateNameMap {
    private nameMap: Map<string, string[]>;

    constructor(private definition: ObjectDefinition) {
        this.nameMap = new Map<string, string[]>();
        this.insertKey = this.insertKey.bind(this);
        Object.keys(this.definition.structure).forEach(this.insertKey);
    }

    private insertKey(key: string) {
        const name = this.definition.structure[key].name;
        if (!this.nameMap.has(name)) {
            this.nameMap.set(name, []);
        }
        this.nameMap.get(name)!.push(key);
    }

    public generateDuplicateErrorsForObjectDefinition() {
        const errors: Error[] = [];
        this.getDuplicates().forEach((pair) => {
            errors.push(new DuplicateObjectNameError(this.definition.name, pair));
        });
        return errors;
    }

    private getDuplicates(): NameKeysDuplicatePair[] {
        const duplicatePairs: NameKeysDuplicatePair[] = [];
        this.nameMap.forEach((keys, name) => {
            if (!hasLength(keys, 1)) {
                duplicatePairs.push({ name, keys });
            }
        });
        return duplicatePairs;
    }
}
