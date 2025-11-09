// Removed prerender to support dynamic content from Supabase
export const ssr = true;

export const load = async ({ data }) => {
  return data;
};
