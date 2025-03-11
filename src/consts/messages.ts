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
	quantityUpcomingTasksLoading:
		'При загрузке количества предстоящих задач произошла ошибка, повторите попытку позже',
	quantityTodayTasksLoading:
		'При загрузке количества задач на завтра произошла ошибка, повторите попытку позже',
	addTask: 'Ошибка добавления задачи, повторите попытку позже',
	saveTask: 'Ошибка обновления задачи, повторите попытку позже',
	deleteTask: 'Ошибка удаления задачи, повторите попытку позже',
};

export const LOADING_MESSAGES = {
	common: 'Загрузка...',
	tasks: 'Загрузка задач...',
};

export const NOT_FOUND_MESSAGES = {
	todayTasks: 'На сегодня задач нет',
	tomorrowTasks: 'На завтра задач нет',
	nearTasks: 'Ближайших задач нет',
};

export const SUCCESS_MESSAGES = {
	addTask: 'Задача добавлена',
	saveTask: 'Изменения сохранены',
	deleteTask: 'Задача удалена',
};
