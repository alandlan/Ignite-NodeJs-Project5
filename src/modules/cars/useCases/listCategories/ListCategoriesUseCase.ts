import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRespository: ICategoriesRespository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRespository.list();

    return categories;
  }

  async getById(id: string): Promise<Category> {
    const categories = await this.categoriesRespository.getById(id);

    return categories;
  }
}

export { ListCategoriesUseCase };
