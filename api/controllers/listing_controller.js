import Listing from "../modules/listing_module.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You are not authorised to delete this listing"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Listing deleted" });
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You are not authorized to update this listing"));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true
            }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => { 
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}