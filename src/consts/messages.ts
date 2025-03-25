import { TIMESTAMP_MAX, TIMESTAMP_MIN } from './validation';

export const MESSAGES_FIELD = {
	emailRequired: 'Email обязателен',
	emailIncorrect: 'Некорректный email',
	passwordRequired: 'Пароль обязателен',
	passwordUpperCase: 'Пароль должен содержать хотя бы один заглавный латинский символ',
	passwordLowerCase: 'Пароль должен содержать хотя бы один строчный латинский символ',
	passwordNumber: 'Пароль должен содержать хотя бы одну цифру',
	passwordMin: (min: number) => `Минимальная длина пароля ${min} символов`,
	passwordMax: (max: number) => `Максимальная длина пароля ${max} символов`,
	nameRequired: 'Имя обязательно',
	nameMax: (max: number) => `Максимальная длина имени ${max} символов`,
	passwordRepeatRequired: 'Введите пароль еще раз',
	passwordRepeatIncorrect: 'Пароли не совпадают',
	policyRequired: 'Для продолжения примите политику конфиденциальности',
	policyCheckbox: 'Для продолжения примите политику конфиденциальности',
	dateRequired: 'Дата обязательна',
	nameTaskMax: (max: number) => `Максимальная длина названия задачи ${max} символов`,
	nameTaskRequired: 'Название задачи обязательно',
	nameTagMax: (max: number) => `Максимальная длина названия тега ${max} символов`,
	nameTagRequired: 'Название тега обязательно',
	hexColorInvalid: 'Неверный цвет в формате HEX',
	colorRequired: 'Цвет обязателен',
	dateRange: () => {
		const min = new Date(TIMESTAMP_MIN).getFullYear();
		const max = new Date(TIMESTAMP_MAX).getFullYear();

		return `Дата должна быть в диапазоне от ${min}г. до ${max}г.`;
	},
};

export const ERRORS_MESSAGES_FIREBASE: Record<string, string> = {
	'auth/too-many-requests': 'Слишком много попыток, попробуйте позже',
	'auth/user-not-found': 'Неверный логин или пароль',
	'auth/wrong-password': 'Неверный логин или пароль',
	'auth/invalid-credential': 'Неверный логин или пароль',
	'auth/invalid-display-name': 'Некорректное имя',
	'auth/invalid-email': 'Некорректный email',
	'auth/invalid-password': 'Некорректный пароль',
	'auth/password-does-not-meet-requirements': 'Некорректный пароль',
	'auth/email-already-in-use': 'Пользователь с таким Email уже существует',
	unknown: 'Неизвестная ошибка, попробуйте позже',
};

export const ERRORS_MESSAGES = {
	userLoading: 'Ошибка загрузки пользователя, повторите попытку позже',
	googleAuth: 'Ошибка аутентификации Google, повторите попытку позже',
	updateTask: 'Ошибка обновления задачи, повторите попытку позже',
	tasksLoading: 'При загрузке задач произошла ошибка, повторите попытку позже',
	tasksLoadingShort: 'Ошибка загрузки задач',
	quantityUpcomingTasksLoading:
		'При загрузке количества предстоящих задач произошла ошибка, повторите попытку позже',
	quantityTodayTasksLoading:
		'При загрузке количества задач на сегодня произошла ошибка, повторите попытку позже',
	quantityTomorrowTasksLoading:
		'При загрузке количества задач на завтра произошла ошибка, повторите попытку позже',
	quantityTasksLoading: 'При загрузке количества задач произошла ошибка, повторите попытку позже',
	addTask: 'Ошибка добавления задачи, повторите попытку позже',
	saveTask: 'Ошибка обновления задачи, повторите попытку позже',
	deleteTask: 'Ошибка удаления задачи, повторите попытку позже',
	addTag: 'Ошибка добавления тега, повторите попытку позже',
	saveTag: 'Ошибка обновления тега, повторите попытку позже',
	deleteTag: 'Ошибка удаления тега, повторите попытку позже',
	tagNameLoading: 'Ошибка загрузки названия тега, повторите попытку позже',
	tagLoading: 'Ошибка загрузки тега, повторите попытку позже',
	signOut: 'Ошибка выхода, повторите попытку позже',
};

export const LOADING_MESSAGES = {
	common: 'Загрузка...',
	tasks: 'Загрузка задач...',
	tags: 'Загрузка тегов...',
};

export const NOT_FOUND_MESSAGES = {
	todayTasks: 'На сегодня задач нет',
	tomorrowTasks: 'На завтра задач нет',
	nearTasks: 'Ближайших задач нет',
	tags: 'Тегов нет',
	tasks: 'Задач нет',
	tagSet: 'Тег не установлен',
};

export const SUCCESS_MESSAGES = {
	addTask: 'Задача добавлена',
	saveTask: 'Изменения сохранены',
	deleteTask: 'Задача удалена',
	addTag: 'Тег добавлен',
	saveTag: 'Тег сохранен',
	deleteTag: 'Тег удален',
};
