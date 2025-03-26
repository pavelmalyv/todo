export const LOGIN_URL = '/login';
export const REGISTRATION_URL = '/registration';
export const TODAY_TASKS_URL = '/today';
export const TOMORROW_TASKS_URL = '/tomorrow';
export const CALENDAR = '/calendar';
export const RESET_PASSWORD_URL = '/auth/reset-password';
export const getTagUrl = (id: string) => `/tag/${id}`;
export const getTasksDayUrl = (timestamp: number | string) => `/tasks-day/${timestamp}`;
