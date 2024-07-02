<p align="center">
  <a>
    <img src="https://github.com/berry-13/mailgun-utility/assets/81851188/2a6b345b-9657-488c-8017-c6a089bda7de" height="256">
  </a>
  <h1 align="center">
    <a >Mailgun Utility</a>
  </h1>
</p>


<p align="center">
  <a href="https://www.npmjs.com/package/mailgun-utility"><img src="https://img.shields.io/npm/v/mailgun-utility.svg" alt="npm version"></a>
  <a href="https://github.com/berry-13/mailgun-utility/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>

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
