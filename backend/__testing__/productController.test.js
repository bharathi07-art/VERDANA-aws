import { createProduct } from "../controller/productController.js";
import Product from "../models/product.js";

jest.mock("../models/product.js", () => ({
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

const productData = {
  name: "Rosemary Oil",
  brand: "Verdana",
  category: "Hair Care",
  subCategory: "Oils",
  price: 19.99,
};

afterEach(() => jest.clearAllMocks());

describe("createProduct", () => {
  test("creates a new product and returns 201", async () => {
    Product.findOne.mockResolvedValue(null);
    Product.create.mockResolvedValue({ id: 1, ...productData });

    const req = { body: productData };
    const res = mockRes();
    await createProduct(req, res);

    expect(Product.findOne).toHaveBeenCalledWith({
      where: { name: productData.name, brand: productData.brand },
    });
    expect(Product.create).toHaveBeenCalledWith(productData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...productData });
  });

  test("returns 409 if product with same name and brand exists", async () => {
    Product.findOne.mockResolvedValue({ id: 1, ...productData });

    const req = { body: productData };
    const res = mockRes();
    await createProduct(req, res);

    expect(Product.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "product with name and brand available",
    });
  });

  test("returns 500 on database error", async () => {
    Product.findOne.mockRejectedValue(new Error("DB connection failed"));

    const req = { body: productData };
    const res = mockRes();
    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB connection failed" });
  });
});
