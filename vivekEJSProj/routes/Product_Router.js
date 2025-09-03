
import express from "express";

import { saveInBulk ,getProductById,buyNowPage} from "../controller/product_controller.js";

const router = express.Router();

router.post("/save-in-bulk",saveInBulk);
router.get("/:productId",getProductById);
router.get("/buyNow/:productId",buyNowPage);
export default router;