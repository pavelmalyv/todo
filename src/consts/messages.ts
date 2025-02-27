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
