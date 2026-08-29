import request from "supertest";
import express from "express";
import authRouter from "../router/authrouter.js";
import Admin from "../models/admin.js";

jest.mock("../models/admin.js", () => ({
  __esModule: true,
  default: { findOne: jest.fn() },
}));

jest.mock("../models/product.js", () => ({
  __esModule: true,
  default: { findOne: jest.fn(), create: jest.fn() },
}));

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

afterEach(() => jest.clearAllMocks());

describe("Auth - login", () => {
  test("returns 400 when credentials are missing", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  test("returns 401 when admin not found", async () => {
    Admin.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "wrong" });

    expect(res.status).toBe(401);
  });

  test("returns 500 on database error", async () => {
    Admin.findOne.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "password" });

    expect(res.status).toBe(500);
  });
});
