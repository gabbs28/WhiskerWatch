export interface ErrorResponse {
    error: boolean;
    title: string;
    status: number;
    errors: object;
}

export const generateErrorResponse = (
    title: string,
    status: number,
    errors: object = {},
): ErrorResponse => {
    return {
        error: true,
        title,
        status,
        errors,
    };
};
