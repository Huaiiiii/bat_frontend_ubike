/**
 * @param {number} N - 正整數
 * @returns {number} 
 */
function batMobileSum(N) {
  if (typeof N !== "number" || N < 1 || !Number.isInteger(N)) {
    throw new Error("N 必須為正整數");
  }
  let sum = 1;
  for (let i = 2; i <= N; i++) {
    if (i % 2 === 0) {
      sum += i;
    } else {
      sum -= i;
    }
  }
  return sum;
}

const N = 5;
console.log(batMobileSum(N));
