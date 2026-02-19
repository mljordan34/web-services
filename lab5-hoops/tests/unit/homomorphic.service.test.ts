import { describe, it, expect } from "vitest";
import { HomomorphicService } from "../../src/services/homomorphic.service"

const service = new HomomorphicService()

describe("encrypt()", () => {
    it("should return a number", () => {
        const encrypted = service.encrypt(12);
        expect(typeof encrypted).toBe("number");
    })
    it("should be randomized", () => {
        expect(service.encrypt(12)).not.toBe(service.encrypt(12));
    })
    it("should reject negative values", () => {
        expect(() => service.encrypt(-12)).toThrow("plaintext is out of range");
    })
    it("should reject non-integer", () => {
        expect(() => service.encrypt(12.2)).toThrow("plaintext is not an integer");
    })
    it("should reject greater than prime - 1", () => {
        expect(() => service.encrypt(104730)).toThrow("plaintext is out of range");
    })
})


describe("decrypt()", () => {
    it("should handle a valid encrypted number", () => {
        const encrypted = service.decrypt(209470);
        expect(encrypted).toBe(12);
    })
    it("should throw error for invalid encrypted value", () => {
        expect(() => service.decrypt("string" as any)).toThrow("ciphertext is not a number");
    })
})

describe("add()", () => {
    it("should preserve sum", () => {
        expect(service.decrypt(service.add(service.encrypt(12), service.encrypt(12)))).toBe(24);
    })
    it("should reject since higher than prime number", () => {
        expect(() => service.decrypt(service.add(service.encrypt(104700), service.encrypt(104700)))).toThrow("sum exceeds prime number");
    })
})

describe("subtract()", () => {
    it("should preserve difference", () => {
        expect(() => service.decrypt("string" as any)).toThrow("ciphertext is not a number");
    })
})