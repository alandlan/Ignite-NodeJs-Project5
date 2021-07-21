import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
  findById(id: string): Promise<Specification> {
    throw new Error("Method not implemented.");
  }
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    )!;
  }
  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    if (!this.specifications) return this.specifications;

    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id!)
    );

    return allSpecifications;
  }
}

export { SpecificationInMemory };
