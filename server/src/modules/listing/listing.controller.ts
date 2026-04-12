import { Request, Response } from "express";
import { ListingService } from "./listing.service";
import { UnauthorizedException } from "../../utils/exceptions";

export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  createListing = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const listing = await this.listingService.createListing(
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      status: 201,
      message: "Service listing created",
      data: { listing },
    });
  };

  updateListing = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const id = req.params?.id as string;

    const listing = await this.listingService.updateListing(
      req.user.id,
      id,
      req.body,
    );

    return res.status(200).json({
      message: "Listing updated",
      data: { listing },
    });
  };

  deleteListing = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const id = req.params?.id as string;

    await this.listingService.deleteListing(req.user.id, id);

    return res.status(200).json({
      message: "Listing deleted",
    });
  };
}
