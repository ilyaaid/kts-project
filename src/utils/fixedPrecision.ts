export default function fixedPrecision(num: number, prec: number) {
  const pow = Math.pow(10, prec);
  return Math.round(num * pow) / pow;
}
