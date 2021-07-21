export default abstract class Rule<ArgType, T> {
    constructor(protected arg: ArgType) {}

    abstract validate(value: T): Error[];
}
