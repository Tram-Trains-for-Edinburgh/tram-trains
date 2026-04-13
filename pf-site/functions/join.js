import { handleSubmission } from "./_lib/submit.js";

export const onRequestPost = (context) =>
  handleSubmission({
    request: context.request,
    env: context.env,
    formName: "join",
    requiredFields: ["firstName", "lastName", "email", "agreeAims"],
    buildEmail: (d) => ({
      subject: `[TTfE Membership] ${d.firstName} ${d.lastName}`,
      text: [
        `Name: ${d.firstName} ${d.lastName}`,
        `Email: ${d.email}`,
        `Address line 1: ${d.addressLine1 || ""}`,
        `Address line 2: ${d.addressLine2 || ""}`,
        `City: ${d.city || ""}`,
        `Postcode: ${d.postcode || ""}`,
        `Agreed to membership conditions: ${d.agreeAims ? "yes" : "no"}`,
      ].join("\n"),
    }),
  });
