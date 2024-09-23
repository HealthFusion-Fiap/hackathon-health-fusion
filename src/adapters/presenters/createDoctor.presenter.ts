export default class CreateDoctorPresenter {
  adaptOutput(data: any): { status: number; body: any } {
    return {
      status: 201,
      body: data,
    };
  }
}
