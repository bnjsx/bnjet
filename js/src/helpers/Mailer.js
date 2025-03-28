/**
 * Mock Mailer for Development
 *
 * This is a mock mailer implementation used during development for testing purposes.
 * It logs the email details to the console instead of actually sending an email.
 * The mock mailer is required in the Auth module in order to simulate email sending functionality.
 *
 * Usage:
 * - This mock implementation should be used only for development and testing.
 * - In production, you should implement a real mailer using any tool or library, such as Nodemailer.
 * - The mailer function takes the recipient's email address (`to`), the email subject (`subject`), the HTML content (`html`),
 *   and optionally the plain text version of the email (`text`).
 *
 * @param to The recipient's email address.
 * @param subject The subject of the email.
 * @param html The HTML content of the email.
 * @param text (Optional) The plain text content of the email.
 * @returns A promise that resolves once the email details have been logged (or sent).
 */
export const mailer = (to, subject, html, text) => {
  console.log(
    `Email sent to: ${to}\nEmail about: ${subject}\nEmail content:\n${html}`
  );

  return Promise.resolve();
};
