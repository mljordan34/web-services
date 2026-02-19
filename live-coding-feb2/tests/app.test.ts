import { describe, it, expect } from "vitest"
import request from 'supertest'
import app from '../app'
import { StatusCodes } from "http-status-codes"

describe("GET /", () => {
    it("returns the appropriate body", async () => {
        const response = await request(app).get("/").expect(200)

        expect(response.body).toStrictEqual({
            success: true
        })
    })
})

describe("POST /users", () => {
    it("successfully creates a user", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            name: "Dakota",
            email: "email@email.com"
        })
        .expect(StatusCodes.CREATED)

        expect(response.body.toStrictEqual({
            success: true,
            user: {
                name: "Dakota",
                email: "email@email.com"
            }
        }))
    })
})