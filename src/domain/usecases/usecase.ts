export default abstract class Usecase {
  protected readonly gateway: any;

  constructor(container: any) {
    this.gateway = container;
  }
}
