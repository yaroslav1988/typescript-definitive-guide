import { AppConfig } from '@/facade';

interface ILoader {
    get(url: string, options: RequestInit): Promise<Response>;
}

type IRead = ({ value, done }: { value: number; done: boolean }) => any;

const jsonGetOptions: RequestInit = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
        // 'Content-type': 'text/plain',
    }
};
const textGetOptions: RequestInit = {
    method: 'GET',
    headers: {
        'Content-type': 'text/plain; charset=utf-8'
    }
};

export const UrlLoader: ILoader = {
    get(url: string, options: RequestInit) {
        return fetch(url, options);
    }
};

export interface ILoaderConfig {
    contents: string;
    chapters: string;
}

export const Loader = ((loader: ILoader) => (config: ILoaderConfig) => ({
    loadContents() {
        let url = config.contents;

        return loader
            .get(url, jsonGetOptions)
            .then(response => response.json());
    },
    loadChapterByName(name: string) {
        let url = `${config.chapters}/${name}.html`;


        return loader
            .get(url, textGetOptions)
            .then(response => response.text());
    }
}))(UrlLoader);


export type IContentsLoader = ReturnType<typeof Loader>;

export const BookLoader = Loader( { ...AppConfig.book } );
export const NoteLoader = Loader( { ...AppConfig.note } );


