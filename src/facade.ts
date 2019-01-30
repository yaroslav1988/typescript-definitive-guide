export { default as AppConfig } from './configuration';
// export {
// BookLoader as BookLoader,
// NoteLoader as NoteLoader
// } from './loaders/book-loader';

import { BookLoader, NoteLoader } from './loaders/book-loader';


/** Vuex Modules */

import { moduleFactory } from './store/modules/book-contents.module';

export const BookContentsModule = moduleFactory( BookLoader );
export const NoteContentsModule = moduleFactory( NoteLoader );


/** Vue Components */
/// TODO [refactoring]

// import ContentContentsPageFactory from './components/content-contents-page/content-contents-page';
//
// export const ContentContentsPage = ContentContentsPageFactory( { namespace: 'note-contents' } );