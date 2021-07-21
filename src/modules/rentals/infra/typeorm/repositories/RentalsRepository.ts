import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: { user_id},
      relations: ["car"]
    })

    return rental;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental!;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { car_id, end_date: null }});
    return rental!;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { user_id, end_date: null }});
    return rental!;
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
    id,end_date,total
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,total,
      user_id,
      id,end_date
    });

    await this.repository.save(rental);

    return rental!;
  }
}

export { RentalsRepository };
