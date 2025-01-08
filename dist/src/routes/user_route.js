"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersController_1 = __importDefault(require("../controllers/usersController"));
router.post("/register", usersController_1.default.register);
router.post("/login", usersController_1.default.login);
router.post("/refresh", usersController_1.default.refresh);
router.post("/logout", usersController_1.default.logout);
exports.default = router;
//# sourceMappingURL=user_route.js.map