"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stripForSelect = function (data, locale, id, label) {
    if (id === void 0) { id = 'id'; }
    if (label === void 0) { label = 'label'; }
    if (!data) {
        return [];
    }
    return data.map(function (el) {
        return _a = {},
            _a[id] = el.id,
            _a[label] = el.label && el.label[locale] ? el.label[locale] : el.name,
            _a;
        var _a;
    });
};
exports.stripForSelect = stripForSelect;
