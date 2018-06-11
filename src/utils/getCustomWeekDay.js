import moment from 'moment';
import weekDays from 'configurations/weekDays';

export default (value) => {
	const date = moment(value);
	const today = moment().format('YYYY-MM-DD');

	return (today === date.format('YYYY-MM-DD')) ? 'Зараз' : weekDays[date.day()];
};
