import PasswordValidator from './PasswordValidator';

describe('PasswordValidator', () => {
  it('should return true when password is valid', () => {
    expect(PasswordValidator.validate('12345678')).toBe(false);
    expect(PasswordValidator.validate('12345678a')).toBe(false);
    expect(PasswordValidator.validate('12345678A')).toBe(false);
    expect(PasswordValidator.validate('12345678aA')).toBe(true);
    expect(PasswordValidator.validate('12345678AA')).toBe(false);
    expect(PasswordValidator.validate('12345678aa')).toBe(false);
    expect(PasswordValidator.validate('12345678aAa')).toBe(true);
    expect(PasswordValidator.validate('12345678AaA')).toBe(true);
    expect(PasswordValidator.validate('12345678AaAa')).toBe(true);
    expect(PasswordValidator.validate('12345678AaAaA')).toBe(true);
    expect(PasswordValidator.validate('12345678AaAaAa')).toBe(true);
  });
});
