import { handleSubmission } from "./_lib/submit.js";

export const onRequestPost = (context) =>
  handleSubmission({
    request: context.request,
    env: context.env,
    formName: "contact",
    requiredFields: ["name", "email", "message"],
    buildEmail: (d) => ({
      subject: `[TTfE Contact] ${d.name}`,
      text: [
        `${d.name} has sent a message via the Contact Us form on ttfe.org.uk.`,
        ``,
        `You can reply directly to this email to respond to them.`,
        ``,
        `---`,
        ``,
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        ``,
        `Message:`,
        d.message,
      ].join("\n"),
    }),
  });
