import Presenter from '@/adapters/presenters/presenter';

export default class ListSchedulePresenter extends Presenter {
  adaptOutput(data: any): { status: number; body: any } {
    return {
      status: 200,
      body: data,
    };
  }
}
