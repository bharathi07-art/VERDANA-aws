import { getAllProducts, getProductById, deleteProduct } from "../controller/getAllProduct.js";
import Product from "../models/product.js";

jest.mock("../models/product.js", () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("getAllProducts", () => {
  test("returns all draft products", async () => {
    const products = [{ id: 1, name: "Oil", status: "draft" }];
    Product.findAll.mockResolvedValue(products);

    const res = mockRes();
    await getAllProducts({}, res);

    expect(Product.findAll).toHaveBeenCalledWith({
      where: { status: "draft" },
      order: [["createdAt", "DESC"]],
    });
    expect(res.json).toHaveBeenCalledWith(products);
  });

  test("returns 500 on error", async () => {
    Product.findAll.mockRejectedValue(new Error("DB error"));

    const res = mockRes();
    await getAllProducts({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});

describe("getProductById", () => {
  test("returns product when found", async () => {
    const product = { id: 1, name: "Oil" };
    Product.findByPk.mockResolvedValue(product);

    const req = { params: { id: 1 } };
    const res = mockRes();
    await getProductById(req, res);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(product);
  });

  test("returns 404 when product not found", async () => {
    Product.findByPk.mockResolvedValue(null);

    const req = { params: { id: 99 } };
    const res = mockRes();
    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  test("returns 500 on error", async () => {
    Product.findByPk.mockRejectedValue(new Error("DB error"));

    const req = { params: { id: 1 } };
    const res = mockRes();
    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});

describe("deleteProduct", () => {
  test("deletes product and returns 200", async () => {
    Product.destroy.mockResolvedValue(1);

    const req = { params: { id: 1 } };
    const res = mockRes();
    await deleteProduct(req, res);

    expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Product delete successfully" });
  });

  test("returns 404 when product not found", async () => {
    Product.destroy.mockResolvedValue(0);

    const req = { params: { id: 99 } };
    const res = mockRes();
    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
