import { randomInt } from "node:crypto";

export class HomomorphicService {
    private prime: number; // the secret key

    constructor(prime: number = 104729) {
        this.prime = prime;
    }

    encrypt(plaintext: number): number {

        if (typeof plaintext !== 'number' || !Number.isInteger(plaintext)) {
            throw new Error("plaintext is not an integer")
        }

        if (plaintext < 0 || plaintext > this.prime - 1) {
            throw new Error("plaintext is out of range")
        }

        return plaintext + (randomInt(0, 1000) * this.prime)
    }

    decrypt(ciphertext: number): number {
        if (typeof ciphertext !== "number") {
            throw new Error("ciphertext is not a number")
        }
        return ciphertext % this.prime;
    }

    add(c1: number, c2: number): number {
        if ((this.decrypt(c1) + this.decrypt(c2)) >= this.prime) {
            throw new Error("sum exceeds prime number")
        }
        return c1 + c2
    }

    subtract(c1: number, c2: number): number {
        // implement me
        return 0;
    }

    getPrime(): number {
        // implement me
        return 0;
    }
}