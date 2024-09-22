import Usecase from '@/domain/usecases/usecase';
import { NotFoundError } from '@/domain/errors';
import { OpenSchedules } from '@/domain/usecases/schedule/schedule_dtos';

export default class ListScheduleUsecase extends Usecase {
  async execute(doctorId: string): Promise<Array<OpenSchedules>> {
    if (await this.gateway.doctorRepository.exists(doctorId)) {
      const openSchedules = await this.gateway.scheduleRepository.findOpenSchedules(doctorId);
      return { ...openSchedules };
    }
    throw new NotFoundError();
  }
}
