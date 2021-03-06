export const isEmpty = (x: string | any[]) => x.length === 0;

export const hasLength = (x: string | any[], n: number) => x.length === n;

export const isNil = (x: any) => x === undefined || x === null;

export const equals = (a: any, b: any) => a === b;

export const doesMatchRegex = (s: string, expression: RegExp) => expression.test(s);

export const isPlainObject = (x: any) => {
    if (isNil(x)) {
        return false;
    }
    if (Array.isArray(x)) {
        return false;
    }
    return typeof x === 'object';
};
