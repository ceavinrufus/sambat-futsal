import formatNumberWithDot from '../formatNumber';

describe('formatNumberWithDot', () => {
  it('should format numbers with more than three digits', () => {
    const result = formatNumberWithDot(1234567890);
    expect(result).toBe('1.234.567.890');
  });

  it('should not format numbers with three digits or less', () => {
    const result = formatNumberWithDot(123);
    expect(result).toBe('123');
  });
});
