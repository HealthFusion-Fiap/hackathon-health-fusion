export default abstract class Presenter {
  private readonly responseHandler;

  constructor(data: { responseHandler: any }) {
    this.responseHandler = data.responseHandler;
  }

  present(data: any) {
    const output = this.adaptOutput(data);

    return this.responseHandler
      .status(output.status || 200)
      .json(output.body);
  }

  abstract adaptOutput(data: any): { status: number; body: any };
}
