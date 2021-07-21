import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRespository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRespository {
  getById(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
