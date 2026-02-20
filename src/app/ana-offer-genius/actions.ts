'use server';

/**
 * Verifies the OfferGenius access password securely on the server.
 */
export async function verifyOfferGeniusPassword(password: string): Promise<boolean> {
    const correctPassword = process.env.LAUNCH_STACK_PASSWORD;
    return password === correctPassword;
}
