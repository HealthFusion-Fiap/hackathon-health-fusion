// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { Jwt } from '@/domain/services/jwt';
import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import { Doctor } from '@/entities/doctor.entity';
import ListDoctorsController from './listDoctors.controller';

describe('Suit tests for List Doctor Controller', () => {
  let listDoctorsUsecase: MockProxy<ListDoctorsUseCase>;
  let jwt: MockProxy<Jwt>;
  let listDoctorsController: ListDoctorsController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    listDoctorsUsecase = mock();
    jwt = mock();

    listDoctorsController = new ListDoctorsController(listDoctorsUsecase, jwt);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 200 when doctor is created', async () => {
    const doctor = mock<Doctor>() as any;
    listDoctorsUsecase.execute.mockResolvedValue({
      doctors: [doctor],
    });
    jwt.login.mockResolvedValue('123' as never);

    const { code, body } = await listDoctorsController.execute({
      headers: {
        authorization: '123',
      },
    });

    expect(code).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(1);
  });

  it('should return 500 when an error occurs', async () => {
    listDoctorsUsecase.execute.mockRejectedValue(new Error());
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await listDoctorsController.execute({
      headers: {
        authorization: '123',
      },
    });

    expect(code).toBe(500);
  });
});
