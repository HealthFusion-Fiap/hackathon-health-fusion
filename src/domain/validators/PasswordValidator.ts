const passwordValidationRules = {
  length: (value: string) => value.length >= 8,
  numbers: (value: string) => /\d/g.test(value),
  uppercase: (value: string) => /[A-Z]/g.test(value),
  lowercase: (value: string) => /[a-z]/g.test(value),
};

export default class PasswordValidator {
  static validate(password: string): boolean {
    return passwordValidationRules.length(password)
      && passwordValidationRules.lowercase(password)
      && passwordValidationRules.uppercase(password)
      && passwordValidationRules.numbers(password);
  }
}
