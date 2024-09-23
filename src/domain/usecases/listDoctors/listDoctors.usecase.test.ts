// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import ListDoctorsUseCase from './listDoctors.usecase';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { Doctor } from '@/entities/doctor.entity';

describe('Suit tests for List Doctors Use Case', () => {
  let doctorRepository: MockProxy<DoctorRepository>;
  let listDoctorsUseCase: ListDoctorsUseCase;

  beforeEach(() => {
    doctorRepository = mock();
    listDoctorsUseCase = new ListDoctorsUseCase(doctorRepository);
  });

  it('should be able to list doctors', async () => {
    const doctor = new Doctor({
      cpf: '23123123',
      crm: '121',
      email: 'email@email.com.br',
      name: 'Doctor who',
      password: 'doctor cool',
    });

    doctorRepository.findAll.mockResolvedValue([doctor]);

    const { doctors } = await listDoctorsUseCase.execute();

    expect(doctors).toEqual([doctor]);
  });

  it('should be able to list doctors with empty array', async () => {
    doctorRepository.findAll.mockResolvedValue([]);

    const { doctors } = await listDoctorsUseCase.execute();

    expect(doctors).toEqual([]);
  });
});
