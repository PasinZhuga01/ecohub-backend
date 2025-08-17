type Resource = 'profile' | 'project' | 'currency' | 'market' | 'catalog_item' | 'cart_item';

interface BaseErrorPayload<T extends string = string> {
	code: T;
}

interface EmptyErrorPayload extends BaseErrorPayload<'INVALID_SESSION' | 'ACCESS_DENIED' | 'INVALID_CREDENTIALS' | 'LOGIN_TAKEN'> {}

interface FormatErrorPayload extends BaseErrorPayload<'INVALID_FORMAT'> {
	details: { targets: { path: string[]; message: string }[] };
}

interface ResourceErrorPayload extends BaseErrorPayload<'NAME_TAKEN' | 'NOT_FOUND'> {
	details: { resource: Resource };
}

interface RelationsErrorPayload extends BaseErrorPayload<'INVALID_RELATIONS'> {
	details: { parent: Resource; child: Resource };
}

export type ErrorsPayload = EmptyErrorPayload | FormatErrorPayload | ResourceErrorPayload | RelationsErrorPayload;
