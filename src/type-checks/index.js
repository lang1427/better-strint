import { isPositive } from "../core/isPositive";

export function forceNonNegativeNumber(value) {
    forceType(value, "number");
    if (value < 0) {
        throw new Error("Expected a positive number: " + value);
    }
}
export function forceCondition(value, condition, conditionName) {
    if (!condition.call(null, value)) {
        throw new Error("Condition " + conditionName + " failed for value " + value);
    }
}
export function forceType(value, type) {
    if (typeof value !== type) {
        throw new Error("Not a " + type + ": " + value);
    }
}

export function forceString(value) {
    forceType(value, "string");
}
export function forcePositiveString(value) {
    forceString(value);
    forceCondition(value, isPositive, "isPositive");
}
export function forceNumber(value) {
    forceType(value, "number");
}
