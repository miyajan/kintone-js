import Headers from '../headers';

export default interface HeadersDecorator {
    decorateHeaders(headers: Headers): void;
}
