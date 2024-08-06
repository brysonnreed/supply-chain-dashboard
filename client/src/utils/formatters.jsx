export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export const usdPrice = {
	type: "number",
	width: 130,
	valueFormatter: (value) => currencyFormatter.format(value),
	cellClassName: "font-tabular-nums",
};

export const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString(undefined, options);
};
