"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const escape_regexp_1 = __importDefault(require("escape-regexp"));
const sequelize_1 = require("sequelize");
const convertFilter = (filter) => {
    if (!filter) {
        return {};
    }
    return filter.reduce((memo, filterProperty) => {
        const { property, value, path: filterPath } = filterProperty;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, index] = filterPath.split('.');
        const isArray = typeof index !== 'undefined' && !Number.isNaN(Number(index));
        const previousValue = memo[property.name()] || {};
        switch (property.type()) {
            case 'string': {
                if (property.sequelizePath.values) {
                    return Object.assign({ [property.name()]: { [sequelize_1.Op.eq]: `${escape_regexp_1.default(value)}` } }, memo);
                }
                if (isArray) {
                    return Object.assign(Object.assign({}, memo), { [property.name()]: {
                            [sequelize_1.Op.in]: [
                                ...(previousValue[sequelize_1.Op.in] || []),
                                escape_regexp_1.default(value),
                            ],
                        } });
                }
                return Object.assign(Object.assign({}, memo), { [sequelize_1.Op.and]: [
                        ...(memo[sequelize_1.Op.and] || []),
                        {
                            [property.name()]: {
                                [sequelize_1.Op.iLike]: `%${escape_regexp_1.default(value)}%`,
                            },
                        },
                    ] });
            }
            case 'number': {
                if (!Number.isNaN(Number(value))) {
                    if (isArray) {
                        return Object.assign(Object.assign({}, memo), { [property.name()]: {
                                [sequelize_1.Op.in]: [
                                    ...(previousValue[sequelize_1.Op.in] || []),
                                    Number(value),
                                ],
                            } });
                    }
                    return Object.assign({ [property.name()]: Number(value) }, memo);
                }
                return memo;
            }
            case 'date':
            case 'datetime': {
                if (value.from || value.to) {
                    return Object.assign({ [property.name()]: Object.assign(Object.assign({}, value.from && { [sequelize_1.Op.gte]: value.from }), value.to && { [sequelize_1.Op.lte]: value.to }) }, memo);
                }
                break;
            }
            default:
                break;
        }
        if (isArray) {
            return Object.assign(Object.assign({}, memo), { [property.name()]: {
                    [sequelize_1.Op.in]: [
                        ...(previousValue[sequelize_1.Op.in] || []),
                        value,
                    ],
                } });
        }
        return Object.assign({ [property.name()]: value }, memo);
    }, {});
};
exports.default = convertFilter;
