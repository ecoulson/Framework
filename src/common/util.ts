export const isEmpty = (x: string | any[]) => x.length === 0;

export const doesMatchRegex = (s: string, expression: RegExp) =>
    expression.test(s);
