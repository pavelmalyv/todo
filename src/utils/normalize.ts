export type NormalizedObj<T> = {
	entities: {
		[key: string]: T;
	};
	ids: string[];
};

export const createNormalizedEmpty = <T>(): NormalizedObj<T> => {
	return { entities: {}, ids: [] };
};

export const applyAddNormalized = <T>(
	obj: NormalizedObj<T>,
	newData: { id: string; value: T; newIdexOrder?: number },
) => {
	const updateEntities = {
		...obj.entities,
		[newData.id]: newData.value,
	};

	const updateIds = [...obj.ids];
	updateIds.splice(newData.newIdexOrder ?? obj.ids.length, 0, newData.id);

	return {
		entities: updateEntities,
		ids: updateIds,
	};
};

type ApplyUpdateNormalizedNewData<T> = {
	id: string;
	value: T;
} & (
	| {
			oldIndexOrder?: never;
			newIdexOrder?: never;
	  }
	| {
			oldIndexOrder: number;
			newIdexOrder: number;
	  }
);

export const applyUpdateNormalized = <T>(
	obj: NormalizedObj<T>,
	newData: ApplyUpdateNormalizedNewData<T>,
) => {
	const updateEntities = {
		...obj.entities,
		[newData.id]: newData.value,
	};
	const updateIds = [...obj.ids];

	if (newData.oldIndexOrder !== undefined && newData.newIdexOrder !== undefined) {
		updateIds.splice(newData.oldIndexOrder, 1);
		updateIds.splice(newData.newIdexOrder, 0, newData.id);
	}

	return {
		entities: updateEntities,
		ids: updateIds,
	};
};

export const applyDeleteNormalizedById = <T>(obj: NormalizedObj<T>, id: string) => {
	const updateEntities = { ...obj.entities };
	delete updateEntities[id];

	const updateIds = [...obj.ids];
	const indexDelete = updateIds.indexOf(id);
	updateIds.splice(indexDelete, 1);

	return {
		entities: updateEntities,
		ids: updateIds,
	};
};
