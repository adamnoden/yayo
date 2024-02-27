// Helper function to extract error message
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null) {
    const err = error as { response?: { data?: string; status?: number } };
    if (err.response && err.response.data && err.response.status) {
      return `${err.response.data} (${err.response.status})`;
    }
  }
  return "An unknown error occurred";
}
