export default class CpfValidator {
  static validate(documentStr: string): boolean {
    if (!documentStr) return false;

    const document = documentStr.replace(/\D/g, '');

    if (document.length !== 11) return false;

    if (document.replace(new RegExp(`${document[0]}`, 'g'), '').length === 0) {
      return false;
    }

    let sumD1 = 0;
    for (let i = 0; i < 9; i += 1) {
      sumD1 += Number(document[8 - i]) * (2 + i);
    }

    const modD1 = sumD1 % 11;
    const d1 = modD1 < 2 ? 0 : 11 - modD1;

    if (d1 !== Number(document[9])) return false;

    let sumD2 = 0;
    for (let i = 0; i < 10; i += 1) {
      sumD2 += Number(document[9 - i]) * (2 + i);
    }

    const modD2 = sumD2 % 11;
    const d2 = modD2 < 2 ? 0 : 11 - modD2;

    if (d2 !== Number(document[10])) return false;

    return true;
  }
}
