import { hasLength } from '../../../../common/util';
import ModelDefinition from '../common/model-definition';
import NameKeysDuplicatePair from '../common/name-keys-duplicate-pair';
import DuplicateObjectNameError from './duplicate-object-name-error';

export default class ObjectDuplicateNameMap {
    private nameMap: Map<string, string[]>;

    constructor(private structure: Record<string, ModelDefinition>) {
        this.nameMap = new Map<string, string[]>();
        this.insertKey = this.insertKey.bind(this);
        Object.keys(structure).forEach(this.insertKey);
    }

    private insertKey(key: string) {
        const name = this.structure[key].name;
        if (!this.nameMap.has(name)) {
            this.nameMap.set(name, []);
        }
        this.nameMap.get(name)!.push(key);
    }

    public generateDuplicateErrorsForObjectDefinition(name: string) {
        const errors: Error[] = [];
        this.getDuplicates().forEach((pair) => {
            errors.push(new DuplicateObjectNameError(name, pair));
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
