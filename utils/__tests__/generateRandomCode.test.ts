import generateRandomCode from "../generateRandomCode";

describe('generateRandomCode', () => {
  it('should generate a random code of the specified length', () => {
    const length = 8;
    const result = generateRandomCode(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[a-zA-Z0-9]+$/); // Check if the result contains only alphanumeric characters
  });

  it('should generate a different code on each call', () => {
    const length = 10;
    const result1 = generateRandomCode(length);
    const result2 = generateRandomCode(length);
    expect(result1).not.toEqual(result2);
  });

  it('should handle zero length and return an empty string', () => {
    const result = generateRandomCode(0);
    expect(result).toBe('');
  });

  it('should handle negative length and return an empty string', () => {
    const result = generateRandomCode(-5);
    expect(result).toBe('');
  });
});
