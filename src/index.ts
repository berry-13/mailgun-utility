// src/index.ts

import FormData from "form-data";
import fetch from "node-fetch";
import { Buffer } from "buffer";

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface ValidationResult {
  address: string;
  is_valid: boolean;
  parts: {
    display_name: string | null;
    domain: string;
    local_part: string;
  };
  reason: string | null;
  result: string;
  risk: string;
}

export class MailgunClient {
  private domainName: string;
  private apiKey: string;
  private baseUrl: string;
  private validationBaseUrl: string;

  constructor(domainName: string, apiKey: string) {
    this.domainName = domainName;
    this.apiKey = apiKey;
    this.baseUrl = `https://api.mailgun.net/v3/${this.domainName}`;
    this.validationBaseUrl = "https://api.mailgun.net/v4";
  }

  private getAuthHeader(): string {
    return "Basic " + Buffer.from(`api:${this.apiKey}`).toString("base64");
  }

  async sendEmail({ from, to, subject, html }: EmailOptions): Promise<any> {
    const form = new FormData();
    form.append("from", from);
    form.append("to", to);
    form.append("subject", subject);
    form.append("html", html);

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: "POST",
        headers: {
          Authorization: this.getAuthHeader(),
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async validateEmail(address: string): Promise<any> {
    const query = new URLSearchParams({ address }).toString();

    try {
      const response = await fetch(
        `${this.validationBaseUrl}/address/validate?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: this.getAuthHeader(),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error validating email:", error);
      throw error;
    }
  }
}

// Export a function to create a new MailgunClient instance
export function createMailgunClient(
  domainName: string,
  apiKey: string
): MailgunClient {
  return new MailgunClient(domainName, apiKey);
}
