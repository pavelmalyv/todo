export const MESSAGES_FIELD = {
	emailRequired: 'Email обязателен',
	emailIncorrect: 'Некорректный email',
	passwordRequired: 'Пароль обязателен',
	passwordUpperCase: 'Пароль должен содержать хотя бы один заглавный латинский символ',
	passwordLowerCase: 'Пароль должен содержать хотя бы один строчный латинский символ',
	passwordNumber: 'Пароль должен содержать хотя бы одну цифру',
	passwordMin: (min: number) => `Минимальная длина пароля ${min} символов`,
	passwordMax: (max: number) => `Максимальная длина пароля ${max} символов`,
};

export const ERRORS_MESSAGES_FIREBASE: Record<string, string> = {
	'auth/too-many-requests': 'Слишком много попыток, попробуйте позже',
	'auth/user-not-found': 'Неверный логин или пароль',
	'auth/wrong-password': 'Неверный логин или пароль',
	'auth/invalid-credential': 'Неверный логин или пароль',
	'auth/invalid-display-name': 'Некорректное имя',
	'auth/invalid-email': 'Некорректный email',
	'auth/invalid-password': 'Некорректный пароль',
	'auth/email-already-exists': 'Email занят',
	unknown: 'Неизвестная ошибка, попробуйте позже',
};
export const LOADING_MESSAGES = {
	common: 'Загрузка...',
};
