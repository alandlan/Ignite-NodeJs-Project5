import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const all = await listSpecificationsUseCase.execute();

    return response.json(all);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const specification = await listSpecificationsUseCase.getById(id);

    return response.status(200).json(specification);
  }
}

export { ListSpecificationsController };
