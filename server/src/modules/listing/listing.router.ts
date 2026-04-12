import { Router } from "express";
import { ListingController } from "./listing.controller";
import { ListingService } from "./listing.service";
import { validate } from "../../middleware/validate";
import { CreateListingSchema, UpdateListingSchema } from "./listing.schema";

export const listingRouter = Router();

const controller = new ListingController(new ListingService());

listingRouter.post(
  "/",
  validate(CreateListingSchema),
  controller.createListing,
);
listingRouter.patch(
  "/:id",
  validate(UpdateListingSchema),
  controller.updateListing,
);
listingRouter.delete("/:id", controller.deleteListing);
