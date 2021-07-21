import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRespository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }
  async getById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id, {
      relations: ["cars"],
    });
    return category!;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category!;
  }
}

export { CategoriesRepository };
