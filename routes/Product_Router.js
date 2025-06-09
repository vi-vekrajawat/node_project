
import express from "express";
// import { saveInBulk, getProductById, buyNowPage } from "../controller/product.controller.js";
// import { auth } from "../middleware/auth.js";
import { saveInBulk ,getProductById,buyNowPage} from "../controller/product_controller.js";

const router = express.Router();

// http://localhost:3000/product/save-in-bulk
router.post("/save-in-bulk",saveInBulk);
router.get("/:productId",getProductById);
// router.get("/product",getProductById);
router.get("/buyNow/:productId",buyNowPage);
export default router;