export const timeToString = (time: Date|string): string => {
	const date = new Date(time);
	return date.toISOString().split("T")[0];
};
