export const isEmpty = (x: string | any[]) => x.length === 0;

export const hasLength = (x: string | any[], n: number) => x.length === n;

export const doesMatchRegex = (s: string, expression: RegExp) =>
    expression.test(s);
