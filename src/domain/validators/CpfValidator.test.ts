import CpfValidator from './CpfValidator';

describe('CpfValidator', () => {
  it('should return true when CPF is valid', () => {
    expect(CpfValidator.validate('52998224725')).toBe(true);
    expect(CpfValidator.validate('56517303030')).toBe(true);
    expect(CpfValidator.validate('565.173.030-30')).toBe(true);
    expect(CpfValidator.validate('286.141.160-04')).toBe(true);
    expect(CpfValidator.validate('486.955.990-00')).toBe(true);
    expect(CpfValidator.validate('574.494.440-03')).toBe(true);
  });

  it('should return false when CPF is invalid', () => {
    expect(CpfValidator.validate('')).toBe(false);
    expect(CpfValidator.validate('oddf9qwodkjfo')).toBe(false);
    expect(CpfValidator.validate('12345678901')).toBe(false);
    expect(CpfValidator.validate('529.982.247-16')).toBe(false);
    expect(CpfValidator.validate('810.277.397-75')).toBe(false);
    expect(CpfValidator.validate('11111111111')).toBe(false);
    expect(CpfValidator.validate('22222222222')).toBe(false);
    expect(CpfValidator.validate('33333333333')).toBe(false);
    expect(CpfValidator.validate('44444444444')).toBe(false);
    expect(CpfValidator.validate('55555555555')).toBe(false);
    expect(CpfValidator.validate('66666666666')).toBe(false);
    expect(CpfValidator.validate('77777777777')).toBe(false);
    expect(CpfValidator.validate('88888888888')).toBe(false);
    expect(CpfValidator.validate('99999999999')).toBe(false);
  });
});
