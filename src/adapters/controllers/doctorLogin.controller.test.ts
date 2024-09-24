// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import DoctorLoginUseCase from '@/domain/usecases/doctorLogin/doctorLogin.usecase';
import { DoctorLoginController } from './doctorLogin.controller';
import { InvalidPassword } from '@/domain/errors';

describe('Suit tests for Doctor Login Controller', () => {
  let doctorLoginUsecase: MockProxy<DoctorLoginUseCase>;
  let doctorLoginController: DoctorLoginController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    doctorLoginUsecase = mock();

    doctorLoginController = new DoctorLoginController(doctorLoginUsecase);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code } = await doctorLoginController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 401 when password incorrect', async () => {
    const input = {
      body: {
        email: 'email@email.com',
        password: '123',
      },
    };

    doctorLoginUsecase.execute.mockRejectedValue(new InvalidPassword());

    const { code, body } = await doctorLoginController.execute(input);

    expect(code).toBe(401);
    expect(body).toEqual({ message: 'Invalid password' });
  });

  it('should return 200 when doctor logged successful', async () => {
    const input = {
      body: {
        email: 'email@email.com',
        password: '123',
      },
    };

    const token = 'token';
    doctorLoginUsecase.execute.mockResolvedValue({ token });

    const { code, body } = await doctorLoginController.execute(input);

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

    doctorLoginUsecase.execute.mockRejectedValue(new Error());

    const { code } = await doctorLoginController.execute(input);

    expect(code).toBe(500);
  });
});
