"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recomendationController = void 0;
var RecomendationController = /** @class */ (function () {
    function RecomendationController() {
    }
    RecomendationController.prototype.recomendations = function (req, res) {
        return res.json({ response: 'Hello World' });
    };
    return RecomendationController;
}());
exports.recomendationController = new RecomendationController();
