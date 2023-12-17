export const timeToString = (time: Date): string => {
	const date = new Date(time);
	return date.toISOString().split("T")[0];
};
