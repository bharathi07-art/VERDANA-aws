import { SubscriptionFn } from "../controller/subscriptionController.js";
import Subscription from "../models/subscription.js";

jest.mock("../models/subscription.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("SubscriptionFn", () => {
  test("returns 400 when email is missing", async () => {
    const req = { body: {} };
    const res = mockRes();
    await SubscriptionFn(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The subscription feild must not to be empty..",
    });
  });

  test("returns 409 when email already subscribed", async () => {
    Subscription.findOne.mockResolvedValue({ id: 1, email: "test@test.com" });

    const req = { body: { email: "test@test.com" } };
    const res = mockRes();
    await SubscriptionFn(req, res);

    expect(Subscription.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("creates subscription and returns 200", async () => {
    Subscription.findOne.mockResolvedValue(null);
    Subscription.create.mockResolvedValue({ id: 2, email: "new@test.com" });

    const req = { body: { email: "new@test.com" } };
    const res = mockRes();
    await SubscriptionFn(req, res);

    expect(Subscription.create).toHaveBeenCalledWith({ email: "new@test.com" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 2, email: "new@test.com" });
  });

  test("returns 500 on error", async () => {
    Subscription.findOne.mockRejectedValue(new Error("DB error"));

    const req = { body: { email: "new@test.com" } };
    const res = mockRes();
    await SubscriptionFn(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
