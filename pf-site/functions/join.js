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
        `${d.firstName} ${d.lastName} has completed the membership form on ttfe.org.uk and would like to join Tram Trains for Edinburgh.`,
        ``,
        `You can reply directly to this email to get in touch with them about membership and the annual subscription if they have not yet paid.`,
        ``,
        `---`,
        ``,
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
