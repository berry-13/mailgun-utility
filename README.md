# Mailgun Utility

A simple utility for interacting with the Mailgun API

## Installation

```
npm install mailgun-utility
```

## Usage

```typescript
import { createMailgunClient } from "mailgun-utility";

const mailgunClient = createMailgunClient("YOUR_DOMAIN_NAME", "YOUR_API_KEY");

// Send an email
mailgunClient
  .sendEmail({
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: "Test Email",
    html: "<h1>Hello!</h1><p>This is a test email.</p>",
  })
  .then((result) => console.log("Email sent:", result))
  .catch((error) => console.error("Failed to send email:", error));

// Validate an email
mailgunClient
  .validateEmail("test@example.com")
  .then((result) => console.log("Validation result:", result))
  .catch((error) => console.error("Failed to validate email:", error));
```
