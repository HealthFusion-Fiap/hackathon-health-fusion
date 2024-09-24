// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import CreatePatientUsecase from '@/domain/usecases/createPatient/createPatient.usecase';
import { CreatePatientController } from './createPatient.controller';
import { Patient } from '@/entities/patient.entity';

describe('Suit tests for Create Patient Controller', () => {
  let createPatientUsecase: MockProxy<CreatePatientUsecase>;
  let createPatientController: CreatePatientController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    createPatientUsecase = mock();

    createPatientController = new CreatePatientController(createPatientUsecase);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code } = await createPatientController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 201 when patient is created', async () => {
    const input = {
      body: {
        name: 'Patient',
        cpf: '123456789',
        crm: '123456789',
        email: 'email@email.com.br',
        password: '123',
      },
    };

    const patient = mock<Patient>();
    createPatientUsecase.execute.mockResolvedValue({ patient });

    const { code } = await createPatientController.execute(input);

    expect(code).toBe(201);
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      body: {
        name: 'Patient',
        cpf: '123456789',
        crm: '123456789',
        email: 'email@email.com.br',
        password: '123',
      },
    };

    createPatientUsecase.execute.mockRejectedValue(new Error());

    const { code } = await createPatientController.execute(input);

    expect(code).toBe(500);
  });
});
