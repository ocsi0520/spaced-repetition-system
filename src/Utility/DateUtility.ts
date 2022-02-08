export class DateUtility {
  public static isValidDate(value: unknown): value is Date {
    return (
      value instanceof Date &&
      !isNaN(value.valueOf())
    );
  }
}
