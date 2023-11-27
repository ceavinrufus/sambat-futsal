export default function formatNumberWithDot(number: number): string {
    // Convert the number to a string
    const numberString = number.toString();
  
    // Check if the number has more than three digits
    if (numberString.length > 3) {
      // Split the number into groups of three from the right
      const parts = [];
      let remainder = numberString.length % 3 || 3;
      let start = 0;
  
      while (start < numberString.length) {
        parts.push(numberString.substr(start, remainder));
        start += remainder;
        remainder = 3;
      }
  
      // Return the formatted number with dots
      return parts.join('.').replace(/\.(?=\d+)/g, '.');
    }
  
    // If the number has three digits or less, return it as is
    return numberString;
}