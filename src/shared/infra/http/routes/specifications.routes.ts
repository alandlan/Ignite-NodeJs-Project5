import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.get("/:id", listSpecificationsController.getById);

export { specificationsRoutes };
