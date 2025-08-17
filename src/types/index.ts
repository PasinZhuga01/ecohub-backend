/* private */

type Resource = 'profile' | 'project' | 'currency' | 'market' | 'catalog_item' | 'cart_item';

interface BaseErrorPayload<T extends string> {
	code: T;
}

/* exports */

export interface EmptyErrorPayload extends BaseErrorPayload<'INVALID_SESSION' | 'ACCESS_DENIED' | 'INVALID_CREDENTIALS' | 'LOGIN_TAKEN'> {}

export interface FormatErrorPayload extends BaseErrorPayload<'INVALID_FORMAT'> {
	details: { targets: { path: string[]; message: string }[] };
}

export interface ResourceErrorPayload extends BaseErrorPayload<'NAME_TAKEN' | 'NOT_FOUND'> {
	details: { resource: Resource };
}

export interface RelationsErrorPayload extends BaseErrorPayload<'INVALID_RELATIONS'> {
	details: { parent: Resource; child: Resource };
}
