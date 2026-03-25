export const APP_MODE = import.meta.env.VITE_APP_MODE || 'private';

export const IS_PUBLIC_MODE = APP_MODE === 'public';
export const IS_PRIVATE_MODE = APP_MODE !== 'public';

export const PUBLIC_ACCESS_LABEL = import.meta.env.VITE_PUBLIC_ACCESS_LABEL || 'Private Access by Invitation';
