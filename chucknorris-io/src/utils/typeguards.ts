export function isStrings(array: string[] | number[]): array is string[] {
    return typeof array[0] === 'string' || array.length < 1
}