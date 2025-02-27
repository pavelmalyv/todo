import { setLocale } from 'yup';
import { MESSAGES_FIELD } from './messages';

setLocale({
	string: {
		email: MESSAGES_FIELD.emailIncorrect,
	},
});
