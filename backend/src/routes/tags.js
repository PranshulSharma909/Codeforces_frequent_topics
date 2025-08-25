import { Router } from "express";
import { getTagFrequencies } from "../services/tagService.js";
import { normalizeQuery } from "../utils/normalizeQuery.js";

const router = Router();

router.get("/frequency", async (req, res) => {
    try {
        const {x, divs, indexes} = normalizeQuery(req.query);
        const result = await getTagFrequencies(x, divs, indexes);

        res.json({
            x,
            divs,
            indexes,
            result
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;