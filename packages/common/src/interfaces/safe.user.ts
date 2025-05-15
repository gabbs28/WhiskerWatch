export interface SafeUser {
    id: bigint;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export const SelectSafeUser = {
    id: true,
    first_name: true,
    last_name: true,
    username: true,
    email: true,
} as const;
