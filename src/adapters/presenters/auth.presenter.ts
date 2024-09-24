export class AuthPresenter {
  static toPresent(data: { token: string}) {
    return {
      token: data.token,
    };
  }
}
