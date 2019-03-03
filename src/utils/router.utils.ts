import { AppConfig } from '@/facade';

export const isExternalSourceHref = (href: string) =>
    !href.startsWith(AppConfig.app.origin);
export const toBookBasePath = (path: string) => '/book/contents/' + path;
