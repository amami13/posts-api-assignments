"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commentsController_1 = __importDefault(require("../controllers/commentsController"));
const usersController_1 = require("../controllers/usersController");
router.get("/", commentsController_1.default.getAll.bind(commentsController_1.default));
router.get("/:id", commentsController_1.default.getById.bind(commentsController_1.default));
router.post("/", usersController_1.authMiddleware, commentsController_1.default.create.bind(commentsController_1.default));
router.delete("/:id", usersController_1.authMiddleware, commentsController_1.default.deleteItem.bind(commentsController_1.default));
exports.default = router;
//# sourceMappingURL=comments_route.js.map