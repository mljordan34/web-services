import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

/**
 * Helper function that returns a fully valid shipment.
 * We will modify ONE field at a time in each test.
 */
const createValidShipment = () => ({
  sender: {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: {
      street: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90210"
    }
  },
  recipient: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-987-6543",
    address: {
      street: "456 Oak Avenue",
      city: "New York",
      state: "NY",
      zip: "10001-1234"
    }
  },
  package: {
    weight: 25,
    dimensions: {
      length: 24,
      width: 18,
      height: 12
    },
    description: "Books and personal items"
  },
  options: {
    priority: "express",
    signature: true,
    insurance: {
      required: true,
      value: 5000
    },
    fragile: false,
    specialInstructions: "Leave at front desk"
  }
});

describe("POST /api/shipments - Happy Path", () => {

  it("should create a shipment successfully", async () => {
    const res = await request(app)
      .post("/api/shipments")
      .send(createValidShipment());

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.trackingNumber).toMatch(/^SWF-/);
    expect(res.body.data.sender.name).toBe("John Smith");
  });

  it("should create a shipment with overnight priority", async () => {
    const shipment = createValidShipment();
    shipment.options.priority = "overnight";

    const res = await request(app)
      .post("/api/shipments")
      .send(shipment);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

});


describe("POST /api/shipments - SENDER validation", () => {

    // sender.name

    it("should reject missing sender name", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.sender.name;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.name");
    });

    it("should reject sender name shorter than 2 characters", async () => {
        const shipment = createValidShipment();
        shipment.sender.name = "J";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.name");
    });

    it("should reject sender name longer than 100 characters", async () => {
        const shipment = createValidShipment();
        shipment.sender.name = "a".repeat(101);

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.name");
    });

    // sender.email

    it("should reject missing sender email", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.sender.email;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.email");
    });

    it("should reject invalid sender email format", async () => {
        const shipment = createValidShipment();
        shipment.sender.email = "not-an-email";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.email");
    });

    // sender.phone

    it("should reject missing sender phone", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.sender.phone;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.phone");
    });

    it("should reject invalid sender phone format", async () => {
        const shipment = createValidShipment();
        shipment.sender.phone = "5551234567";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.phone");
    });

    // sender.address.street

    it("should reject missing sender street", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.sender.address.street;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.street");
    });

    it("should reject sender street shorter than 5 characters", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.street = "1234";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.street");
    });

    // sender.address.city

    it("should reject sender city shorter than 2 characters", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.city = "A";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.city");
    });

    // sender.address.state

    it("should reject state not exactly 2 uppercase letters", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.state = "California";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.state");
    });

    it("should reject lowercase state abbreviation", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.state = "ca";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.state");
    });

    // sender.address.zip

    it("should reject invalid 5-digit zip format", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.zip = "9021";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.zip");
    });

    it("should reject invalid extended zip format", async () => {
        const shipment = createValidShipment();
        shipment.sender.address.zip = "90210-123";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("sender.address.zip");
    });

});

describe("POST /api/shipments - RECIPIENT validation", () => {
    // recipient.name

    it("should reject missing recipient name", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.recipient.name;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.name");
    });

    it("should reject recipient name shorter than 2 characters", async () => {
        const shipment = createValidShipment();
        shipment.recipient.name = "J";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.name");
    });

    it("should reject recipient name longer than 100 characters", async () => {
        const shipment = createValidShipment();
        shipment.recipient.name = "a".repeat(101);

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.name");
    });

    // recipient.email

    it("should reject missing recipient email", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.recipient.email;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.email");
    });

    it("should reject invalid recipient email format", async () => {
        const shipment = createValidShipment();
        shipment.recipient.email = "not-an-email";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.email");
    });

    // recipient.phone

    it("should reject missing recipient phone", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.recipient.phone;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.phone");
    });

    it("should reject invalid recipient phone format", async () => {
        const shipment = createValidShipment();
        shipment.recipient.phone = "5551234567";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.phone");
    });

    // recipient.address.street

    it("should reject missing recipient street", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.recipient.address.street;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.street");
    });

    it("should reject recipient street shorter than 5 characters", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.street = "1234";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.street");
    });

    // recipient.address.city

    it("should reject recipient city shorter than 2 characters", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.city = "A";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.city");
    });

    // recipient.address.state

    it("should reject recipient state not exactly 2 uppercase letters", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.state = "New York";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.state");
    });

    it("should reject lowercase recipient state abbreviation", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.state = "ny";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.state");
    });

    // recipient.address.zip

    it("should reject invalid 5-digit recipient zip", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.zip = "1000";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.zip");
    });

    it("should reject invalid extended recipient zip", async () => {
        const shipment = createValidShipment();
        shipment.recipient.address.zip = "10001-123";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("recipient.address.zip");
    });

})

describe("POST /api/shipments - PACKAGE validation", () => {
    // package.weight

    it("should reject missing package weight", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.package.weight;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.weight");
    });

    it("should reject package weight <= 0", async () => {
        const shipment = createValidShipment();
        shipment.package.weight = 0;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.weight");
    });

    it("should reject package weight > 70 pounds", async () => {
        const shipment = createValidShipment();
        shipment.package.weight = 100;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.weight");
    });

    // package.dimensions.length

    it("should reject missing package length", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.package.dimensions.length;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.length");
    });

    it("should reject package length <= 0", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.length = 0;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.length");
    });

    it("should reject package length > 108 inches", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.length = 200;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.length");
    });

    // package.dimensions.width

    it("should reject missing package width", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.package.dimensions.width;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.width");
    });

    it("should reject package width <= 0", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.width = 0;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.width");
    });

    it("should reject package width > 108 inches", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.width = 200;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.width");
    });

    // package.dimensions.height

    it("should reject missing package height", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.package.dimensions.height;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.height");
    });

    it("should reject package height <= 0", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.height = 0;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.height");
    });

    it("should reject package height > 108 inches", async () => {
        const shipment = createValidShipment();
        shipment.package.dimensions.height = 200;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.dimensions.height");
    });

    // package.description

    it("should reject missing package description", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.package.description;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.description");
    });

    it("should reject package description shorter than 3 characters", async () => {
        const shipment = createValidShipment();
        shipment.package.description = "Hi";

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.description");
    });

    it("should reject package description longer than 500 characters", async () => {
        const shipment = createValidShipment();
        shipment.package.description = "a".repeat(501);

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("package.description");
    });

})

describe("POST /api/shipments - OPTIONS validation", () => {
    // options.priority

    it("should reject missing priority", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.options.priority;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.priority");
    });

    it("should reject invalid priority value", async () => {
        const shipment = createValidShipment();
        shipment.options.priority = "super-fast" as any;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.priority");
    });

    // options.signature

    it("should reject missing signature boolean", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.options.signature;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.signature");
    });

    it("should reject non-boolean signature", async () => {
        const shipment = createValidShipment();
        shipment.options.signature = "yes" as any;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.signature");
    });

    // options.insurance.required

    it("should reject missing insurance.required boolean", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.options.insurance.required;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.insurance.required");
    });

    it("should reject non-boolean insurance.required", async () => {
        const shipment = createValidShipment();
        shipment.options.insurance.required = "true" as any;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.insurance.required");
    });

    // options.insurance.value (conditional)

    it("should reject missing insurance value if required is true", async () => {
        const shipment = createValidShipment();
        shipment.options.insurance.required = true;
        // @ts-ignore
        delete shipment.options.insurance.value;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.insurance.value");
    });

    it("should reject insurance value <= 0", async () => {
        const shipment = createValidShipment();
        shipment.options.insurance.required = true;
        shipment.options.insurance.value = 0;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.insurance.value");
    });

    it("should reject insurance value > 50000", async () => {
        const shipment = createValidShipment();
        shipment.options.insurance.required = true;
        shipment.options.insurance.value = 100000;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.insurance.value");
    });

    // options.fragile

    it("should reject missing fragile boolean", async () => {
        const shipment = createValidShipment();
        // @ts-ignore
        delete shipment.options.fragile;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.fragile");
    });

    it("should reject non-boolean fragile", async () => {
        const shipment = createValidShipment();
        shipment.options.fragile = "false" as any;

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.fragile");
    });

    // options.specialInstructions

    it("should reject specialInstructions longer than 500 characters", async () => {
        const shipment = createValidShipment();
        shipment.options.specialInstructions = "a".repeat(501);

        const res = await request(app)
        .post("/api/shipments")
        .send(shipment);

        expect(res.status).toBe(400);
        expect(res.body.errors[0].field).toBe("options.specialInstructions");
    });

})