import z from 'zod';

export const getNavProjects = z
	.object({
		maxCount: z.string()
	})
	.transform(({ maxCount }) => ({ maxCount: Number(maxCount) }));

export const getCurrencies = z
	.object({
		projectId: z.string()
	})
	.transform(({ projectId }) => ({ projectId: Number(projectId) }));

export const getMarkets = z
	.object({
		projectId: z.string()
	})
	.transform(({ projectId }) => ({ projectId: Number(projectId) }));

export const getCatalogsItems = z
	.object({
		marketId: z.string()
	})
	.transform(({ marketId }) => ({ marketId: Number(marketId) }));

export const getCartsItems = z
	.object({
		marketId: z.string()
	})
	.transform(({ marketId }) => ({ marketId: Number(marketId) }));

export const removeEntity = z
	.object({
		id: z.string()
	})
	.transform(({ id }) => ({ id: Number(id) }));

export const clearCartsItems = z
	.object({
		marketId: z.string()
	})
	.transform(({ marketId }) => ({ marketId: Number(marketId) }));
