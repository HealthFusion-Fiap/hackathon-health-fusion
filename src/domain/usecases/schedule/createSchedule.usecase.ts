import Usecase from '@/domain/usecases/usecase';
import { BadRequestError } from '@/domain/errors';
import {
  CreateScheduleInput,
  CreateScheduleOutput,
} from '@/domain/usecases/schedule/schedule_dtos';

export default class CreateScheduleUsecase extends Usecase {
  async execute(
    data: CreateScheduleInput,
    query: Record<string, any>,
    params: Record<string, any>,
  ): Promise<CreateScheduleOutput> {
    data.patient_id = params.patient_id;
    if (await this.gateway.scheduleRepository.isScheduleOpen(data)) {
      return { ...await this.gateway.scheduleRepository.createSchedule(data) };
    }
    throw new BadRequestError();
  }
}
