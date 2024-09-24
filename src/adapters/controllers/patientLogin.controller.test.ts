// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import PatientLoginUseCase from '@/domain/usecases/patientLogin/patientLogin.usecase';
import { PatientLoginController } from './patientLogin.controller';

describe('Suit tests for Patient Login Controller', () => {
  let patientLoginUsecase: MockProxy<PatientLoginUseCase>;
  let patientLoginController: PatientLoginController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    patientLoginUsecase = mock();

    patientLoginController = new PatientLoginController(patientLoginUsecase);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code, body } = await patientLoginController.execute(input);

    expect(code).toBe(400);
    expect(body).toEqual({ message: 'body is empty' });
  });

  it('should return 201 when patient is created', async () => {
    const input = {
      body: {
        email: 'email@email.com',
        password: '123',
      },
    };

    const token = 'token';
    patientLoginUsecase.execute.mockResolvedValue({ token });

    const { code, body } = await patientLoginController.execute(input);

    expect(code).toBe(200);
    expect(body).toEqual({ token });
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      body: {
        email: 'email@email.com',
        password: '123',
      },
    };

    patientLoginUsecase.execute.mockRejectedValue(new Error());

    const { code } = await patientLoginController.execute(input);

    expect(code).toBe(500);
  });
});
