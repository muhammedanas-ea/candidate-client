export const env = {
  BASEURL: import.meta.env.VITE_BASE_URL,
};

export const ROLES = {
  ADMIN: Number(import.meta.env.VITE_ADMIN_USER_ROLE),
  CANDIDATE: Number(import.meta.env.VITE_CANDIDATE_USER_ROLE),
};
