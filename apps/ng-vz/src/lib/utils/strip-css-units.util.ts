export const stripCssUnits = (cssValue: string) => {
	const match = cssValue.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
	return match ? parseFloat(match[1]) : NaN;
};
