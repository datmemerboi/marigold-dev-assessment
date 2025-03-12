// Simple solution
function reverseString(str) {
  if (!str) return str;
  return str.split("").reverse().join("");
}

// Space efficient, in-place solution
function reverseStringInPlace(str) {
  if (!str || str.length === 0) return str;

  let arr = str.split("");

  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join("");
}
