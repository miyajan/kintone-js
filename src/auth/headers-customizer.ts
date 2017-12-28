import Headers from '../headers';

export default interface HeadersCustomizer {
    customizeHeaders(headers: Headers): void;
}
