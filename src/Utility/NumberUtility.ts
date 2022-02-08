// does not handle BigInt type
export class NumberUtility {
  public static isStandardNumber(value: unknown): value is number {
    return (
      typeof value === 'number' &&
      !isNaN(value) &&
      isFinite(value)
    );
  }
}
