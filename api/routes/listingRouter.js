import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getAllListings } from '../controllers/listing_controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, createListing);
listingRouter.delete('/delete/:id', verifyToken, deleteListing);
listingRouter.post("/update/:id", verifyToken, updateListing);
listingRouter.get("/getListing/:id", getListing);
listingRouter.get("/getAllListings", getAllListings);

export default listingRouter;