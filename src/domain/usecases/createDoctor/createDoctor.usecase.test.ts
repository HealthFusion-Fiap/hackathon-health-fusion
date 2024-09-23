import { mock, MockProxy } from 'jest-mock-extended';
import { HashGenerator } from '@/domain/cryptography/hashGenerator';
import { BadRequestError } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repository/doctor';
import { Doctor } from '@/entities/doctor.entity';
import CreateDoctorUsecase from './createDoctor.usecase';

describe('Suit tests for Create Doctor Use Case', () => {
  let doctorRepository: MockProxy<DoctorRepository>;
  let hashGenerator: MockProxy<HashGenerator>;
  let createDoctorUsecase: CreateDoctorUsecase;

  beforeEach(() => {
    hashGenerator = mock();
    doctorRepository = mock();

    createDoctorUsecase = new CreateDoctorUsecase(doctorRepository, hashGenerator);
  });

  it('should throw error when cpf already exists', async () => {
    const doctor = mock<Doctor>();
    doctorRepository.findByCpf.mockResolvedValue(doctor);

    await expect(createDoctorUsecase.execute({
      cpf: '123123213',
      crm: '123123213',
      email: 'doctor@gmail.com',
      name: 'doctor who',
      password: '123',
    })).rejects.toThrow(new BadRequestError('CPF already exists'));
  });

  it('should throw error when crm already exists', async () => {
    const doctor = mock<Doctor>();
    doctorRepository.findByCpf.mockResolvedValue(null);
    doctorRepository.findByCrm.mockResolvedValue(doctor);

    await expect(createDoctorUsecase.execute({
      cpf: '123123213',
      crm: '123123213',
      email: 'doctor@gmail.com',
      name: 'doctor who',
      password: '123',
    })).rejects.toThrow(new BadRequestError('CRM already exists'));
  });

  it('should be able to create a doctor', async () => {
    doctorRepository.findByCpf.mockResolvedValue(null);
    doctorRepository.findByCrm.mockResolvedValue(null);
    hashGenerator.hash.mockResolvedValue('321');

    const { doctor } = await createDoctorUsecase.execute({
      cpf: '123123213',
      crm: '123123213',
      email: 'doctor@gmail.com',
      name: 'doctor who',
      password: '123',
    });

    expect(doctor).toEqual({
      _id: doctor.id,
      props: {
        cpf: '123123213',
        crm: '123123213',
        email: 'doctor@gmail.com',
        name: 'doctor who',
        password: '321',
      },
    });
  });
});
