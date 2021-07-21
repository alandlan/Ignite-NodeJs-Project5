import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ListRentalsByUserUseCase } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserUserCase";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

rentalRoutes.get("/user",ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };
