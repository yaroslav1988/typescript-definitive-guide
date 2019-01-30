import Vue from 'vue';
import Router from 'vue-router';
import { Store } from 'vuex';

Vue.use(Router);

export const create = (store: Store<{}>) => {
    let shared = {
        // beforeRouteLeave(to, from, next){
        //
        // }
    };
    let router = new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',

                name: 'home',
                component: () =>
                    import(/* webpackChunkName: "home" */ './pages/home/HomePage.vue')
            },
            {
                path: '/what-is-new',

                name: 'what-is-new',
                component: () =>
                    import(/* webpackChunkName: "what-is-new" */ './pages/what-is-new/WhatIsNewPage.vue')
                // beforeEnter: async (to, from, next) => {
                //     let isEnterToApp = from.name === null;
                //
                //     if (isEnterToApp) {
                //         await store.dispatch('note-contents/bookContentsLoad');
                //
                //
                //         let { chapter, subchapter } = to.params;
                //         let isRouteExist = store.getters['note-contents/isChapterExist'](
                //             chapter,
                //             subchapter
                //         );
                //
                //         if (!isRouteExist) {
                //             store.dispatch('activateNotFoundRouterFlag');
                //         }
                //     }
                //
                //     next();
                // }
            },
            {
                path: '/what-is-new/:chapter/:subchapter?',
                name: 'note',
                component: () =>
                    import(/* webpackChunkName: "chapter" */ './pages/note/ChapterPage.vue'),
                beforeEnter: async (to, from, next) => {
                    let isEnterToApp = from.name === null;

                    if (isEnterToApp) {
                        await store.dispatch('note-contents/bookContentsLoad');

                        let { chapter, subchapter } = to.params;
                        let isRouteExist = store.getters[
                            'note-contents/isChapterExist'
                        ](chapter, subchapter);

                        if (!isRouteExist) {
                            store.dispatch('activateNotFoundRouterFlag');
                        }
                    }

                    next();
                }
            },
            // {
            //     path: '/what-is-new/:version',
            //
            //     name: 'concrete-version',
            //     component: () =>
            //         import(/* webpackChunkName: "hode" */ './pages/home/HomePage.vue')
            // },
            {
                path: '/book/contents',
                name: 'contents',
                component: () =>
                    import(/* webpackChunkName: "contents" */ './pages/contents/ContentsPage.vue')
            },
            {
                path: '/book/contents/:chapter/:subchapter?',
                name: 'chapter',
                component: () =>
                    import(/* webpackChunkName: "chapter" */ './pages/chapter/ChapterPage.vue'),
                beforeEnter: async (to, from, next) => {
                    let isEnterToApp = from.name === null;

                    if (isEnterToApp) {
                        await store.dispatch('book-contents/bookContentsLoad');

                        let { chapter, subchapter } = to.params;
                        let isRouteExist = store.getters[
                            'book-contents/isChapterExist'
                        ](chapter, subchapter);

                        if (!isRouteExist) {
                            store.dispatch('activateNotFoundRouterFlag');
                        }
                    }

                    next();
                }
            },
            {
                path: '*',
                name: 'not-found',
                component: () =>
                    import(/* webpackChunkName: "not-found" */ './pages/not-found/NotFoundPage.vue')
            }
        ]
    });

    return router;
};
