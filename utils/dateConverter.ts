import moment from "moment";
import 'moment/locale/ru'
export const convertDate = (date: Date) => {
	moment.locale("ru")
	let day = moment(date).date();
	let month = moment(date).format("MMMM");
	let calendarDay = moment(date).format("LLLL").split(" ")[0];
	calendarDay =calendarDay.substring(0, calendarDay.length - 1);
	return {
		day,
		month,
		calendarDay,
	};
};
