import { describe, it, expect } from "vitest";
import { sendContactEmail } from "./email";

describe("AWS SES Email Service", () => {
  it("should successfully send a test email with valid credentials", async () => {
    const testParams = {
      name: "Test User",
      email: "test@example.com",
      phone: "123-456-7890",
      message: "This is a test message from the vitest suite to validate AWS SES credentials.",
    };

    const result = await sendContactEmail(testParams);
    
    expect(result).toBe(true);
  }, 30000); // 30 second timeout for API call
});
