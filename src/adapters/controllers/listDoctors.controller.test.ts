// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import { Doctor } from '@/entities/doctor.entity';
import ListDoctorsController from './listDoctors.controller';

describe('Suit tests for List Doctor Controller', () => {
  let listDoctorsUsecase: MockProxy<ListDoctorsUseCase>;
  let listDoctorsController: ListDoctorsController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    listDoctorsUsecase = mock();

    listDoctorsController = new ListDoctorsController(listDoctorsUsecase);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 200 when doctor is created', async () => {
    const doctor = mock<Doctor>() as any;
    listDoctorsUsecase.execute.mockResolvedValue({
      doctors: [doctor],
    });

    const { code, body } = await listDoctorsController.execute();

    expect(code).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(1);
  });

  it('should return 500 when an error occurs', async () => {
    listDoctorsUsecase.execute.mockRejectedValue(new Error());

    const { code } = await listDoctorsController.execute();

    expect(code).toBe(500);
  });
});
