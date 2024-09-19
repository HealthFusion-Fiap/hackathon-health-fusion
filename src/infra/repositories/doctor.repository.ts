import { CreateDoctorInput } from '@/domain/usecases/createDoctor/dtos';
import Doctor from '@/entities/doctor.entity';

export default class PrismaDoctorRepository /* implements DoctorRepository */ {
  // private readonly doctorModel: any;

  // constructor({ doctorModel }: any) {
  //   this.doctorModel = doctorModel;
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async create(doctor: CreateDoctorInput): Promise<Doctor> {
    // TODO: Implement this method
    return new Doctor('', '');
  }
}
