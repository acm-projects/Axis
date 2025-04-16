export const environment = {
  production: false,
  tinymceApiKey: (window as any)?.env?.TINY_API_KEY || 'no-api-key'
};
