export const userService = {
  async getProfile() {
    return { name: "Charvi", email: "charvi@example.com", role: "User" as const };
  },
};
*** End Patch