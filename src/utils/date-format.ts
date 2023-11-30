type DateFormat = "YYYY/MM/DD - hh:mm";

export function formatDate(date: Date, format: DateFormat) {
	const hour = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString().padStart(4, "0");

	if (format === "YYYY/MM/DD - hh:mm") {
		return `${year}/${month}/${day} - ${hour}:${minutes}`;
	}
	return null;
}
