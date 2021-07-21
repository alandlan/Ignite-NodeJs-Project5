import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepositories: ICategoriesRespository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepositories.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category Already Exists!", 400);
    }

    this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
