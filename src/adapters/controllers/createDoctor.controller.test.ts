// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import CreateDoctorUsecase from '@/domain/usecases/createDoctor/createDoctor.usecase';
import { CreateDoctorController } from './createDoctor.controller';
import { Doctor } from '@/entities/doctor.entity';
import { EmailAlreadyExists } from '@/domain/errors';

describe('Suit tests for Create Doctor Controller', () => {
  let createDoctorUsecase: MockProxy<CreateDoctorUsecase>;
  let createDoctorController: CreateDoctorController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    createDoctorUsecase = mock();

    createDoctorController = new CreateDoctorController(createDoctorUsecase);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code } = await createDoctorController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 201 when doctor is created', async () => {
    const input = {
      body: {
        name: 'Doctor',
        cpf: '123456789',
        crm: '123456789',
        email: 'email@email.com.br',
        password: '123',
      },
    };

    const doctor = mock<Doctor>();
    createDoctorUsecase.execute.mockResolvedValue({ doctor });

    const { code } = await createDoctorController.execute(input);

    expect(code).toBe(201);
  });

  it('should return 409 when doctors email already exists', async () => {
    const input = {
      body: {
        name: 'Doctor',
        cpf: '123456789',
        crm: '123456789',
        email: 'email@email.com.br',
        password: '123',
      },
    };

    createDoctorUsecase.execute.mockRejectedValue(new EmailAlreadyExists());

    const { code, body } = await createDoctorController.execute(input);

    expect(code).toBe(409);
    expect(body).toEqual({ message: 'Email already exists' });
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      body: {
        name: 'Doctor',
        cpf: '123456789',
        crm: '123456789',
        email: 'email@email.com.br',
        password: '123',
      },
    };

    createDoctorUsecase.execute.mockRejectedValue(new Error());

    const { code } = await createDoctorController.execute(input);

    expect(code).toBe(500);
  });
});
