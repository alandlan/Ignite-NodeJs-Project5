import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id)!;

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.findIndex(car => car.id == id);
    this.cars[car].available = available;
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)!;
  }

  async create({
    name,
    description,
    brand,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
