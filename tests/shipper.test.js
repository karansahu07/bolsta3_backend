const request = require("supertest");
const app = require("../app");
const Shipper = require("../models/shipper");
const mongoose = require("mongoose");

describe("POST /shipper", () => {
  it("should create a shipper with valid docket range and no overlap", async () => {
    const newShipper = {
      branch: "valid-branch-id",
      date: "2025-02-22",
      docketFrom: "SDL0001", // Prefix and numeric part
      docketTo: "SDL1000",   // Prefix and numeric part
      sendBy: "John Doe",
      remarks: "Test remarks",
    };

    const response = await request(app)
      .post("/shipper")
      .send(newShipper)
      .expect(201);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data.docketPrefix).toBe("SDL");
    expect(response.body.data.docketFrom).toBe(1);   // Numeric part after parsing
    expect(response.body.data.docketTo).toBe(1000);  // Numeric part after parsing
  });

  it("should fail if docket prefix doesn't match", async () => {
    const invalidShipper = {
      branch: "valid-branch-id",
      date: "2025-02-22",
      docketFrom: "SDL0001",
      docketTo: "ABC1000",  // Different prefix
      sendBy: "John Doe",
      remarks: "Test remarks",
    };

    const response = await request(app)
      .post("/shipper")
      .send(invalidShipper)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("DocketPrefix for DocketFrom and DocketTo must be the same");
    expect(response.body.error).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it("should fail if there is an overlap in docket ranges", async () => {
    // First shipper
    const firstShipper = {
      branch: "valid-branch-id",
      date: "2025-02-22",
      docketFrom: "SDL0001",
      docketTo: "SDL1000",
      sendBy: "John Doe",
      remarks: "Test remarks",
    };

    await request(app)
      .post("/shipper")
      .send(firstShipper)
      .expect(201);

    // Second shipper with an overlapping range
    const secondShipper = {
      branch: "valid-branch-id",
      date: "2025-02-22",
      docketFrom: "SDL500",  // Overlapping range with first shipper
      docketTo: "SDL1500",
      sendBy: "Jane Doe",
      remarks: "Another test remarks",
    };

    const response = await request(app)
      .post("/shipper")
      .send(secondShipper)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Docket range overlaps with an existing shipper");
    expect(response.body.error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
