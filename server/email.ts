import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface SendContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(params: SendContactEmailParams): Promise<boolean> {
  const { name, email, phone, message } = params;
  
  const fromEmail = process.env.SES_FROM_EMAIL || "noreply@kenco.nz";
  const toEmails = [
    process.env.SES_TO_EMAIL || "web@kenco.nz",
    "peter.carikas@kenco.nz"
  ];

  const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}

---
This email was sent from the Kenco website contact form.
  `.trim();

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: toEmails,
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${name}`,
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: emailBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  try {
    await sesClient.send(command);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send contact email:", error);
    return false;
  }
}
