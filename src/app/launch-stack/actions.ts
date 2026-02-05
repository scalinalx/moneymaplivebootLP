'use server';

/**
 * Verifies the Launch Stack password securely on the server.
 * This prevents the actual password from ever being exposed to the client.
 */
export async function verifyLaunchStackPassword(password: string): Promise<boolean> {
    const correctPassword = process.env.LAUNCH_STACK_PASSWORD;

    // Simple constant time comparison not strictly necessary for this use case 
    // but good practice.
    return password === correctPassword;
}
