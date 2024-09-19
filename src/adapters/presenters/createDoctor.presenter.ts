import Presenter from './presenter';

export default class CreateDoctorPresenter extends Presenter {
  adaptOutput(data: any): { status: number; body: any } {
    return {
      status: 201,
      body: data,
    };
  }
}
