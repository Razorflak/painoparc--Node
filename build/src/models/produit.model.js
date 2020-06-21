"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Produit = /** @class */ (() => {
    let Produit = class Produit extends sequelize_typescript_1.Model {
    };
    __decorate([
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produit.prototype, "id", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(false),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Produit.prototype, "nom", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(false),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produit.prototype, "idCommercant", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(true),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.TEXT
        }),
        __metadata("design:type", String)
    ], Produit.prototype, "description", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(false),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.FLOAT
        }),
        __metadata("design:type", Number)
    ], Produit.prototype, "prix", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(true),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produit.prototype, "stock", void 0);
    __decorate([
        sequelize_typescript_1.AllowNull(true),
        sequelize_typescript_1.NotEmpty,
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.FLOAT
        }),
        __metadata("design:type", Number)
    ], Produit.prototype, "commission", void 0);
    Produit = __decorate([
        sequelize_typescript_1.Table({
            tableName: "produit",
            timestamps: true
        })
    ], Produit);
    return Produit;
})();
exports.default = Produit;
//# sourceMappingURL=produit.model.js.map