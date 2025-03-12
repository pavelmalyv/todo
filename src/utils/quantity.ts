export const getQuantityShort = (quantity: number, limit: number) => {
	return quantity > limit ? `${limit}+` : String(quantity);
};
