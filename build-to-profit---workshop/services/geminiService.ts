// Stubbed service to avoid external dependencies for build.
export const generateSalesResponse = async (
  userMessage: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  return Promise.resolve(
    "Thanks for your question! Join the waitlist to get priority access, discounts, and details as soon as we open."
  );
};
