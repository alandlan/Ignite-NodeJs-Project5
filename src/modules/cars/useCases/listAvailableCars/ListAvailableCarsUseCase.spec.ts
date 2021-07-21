import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("shuold be able to list all available cars", async () => {
    const car = await carsRepository.create({
      brand: "Car Brand",
      category_id: "category_id",
      daily_rate: 100.0,
      description: "Car Description",
      fine_amount: 60,
      license_plate: "DEF-1213",
      name: "Car1",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 100.0,
      description: "Car Description",
      fine_amount: 60,
      license_plate: "DEF-1213",
      name: "Car1",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 100.0,
      description: "Car Description",
      fine_amount: 60,
      license_plate: "DEF-1213",
      name: "Car3",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepository.create({
      brand: "Car_brand",
      category_id: "category_id_123",
      daily_rate: 100.0,
      description: "Car Description",
      fine_amount: 60,
      license_plate: "DEF-1213",
      name: "Car3",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_id_123",
    });

    expect(cars).toEqual([car]);
  });
});
