import Vue, { ComponentOptions } from 'vue';

import AppBarComponents from '../shared/app-bar';
import SharedComponents from '../shared/shared';

import TreeDirective from '../../directives/tree/tree.directive';
import SelectionDerective from '../../directives/selected/selection.directive';

import BookGrid from '../../components/book-grid/BookGrid.vue';
import ContentChapterPage from '../../components/content-chapter-what-is-new-page/ContentChapterPage.vue';
import DrawerChapterPage from '../../components/drawer-chapter-what-is-new-page/DrawerChapterPage.vue';
import NavAppDrawer from '../../components/nav-app-drawer/NavAppDrawer.vue';

import ShareSocialBar from '../../components/share-social-bar/ShareSocialBar.vue';
import SyntaxErrorReportDialog from '../../components/syntax-error-report-dialog/SyntaxErrorReportDialog.vue';
import NotFoundPlaceholder from '../../components/not-found-placeholder/NotFoundPlaceholder.vue';
import { mapActions, mapGetters, createNamespacedHelpers } from 'vuex';

export interface IComponent extends Vue {}

const component: ComponentOptions<IComponent> = {
    name: 'chapter',
    components: {
        ...SharedComponents,
        ...AppBarComponents,

        bookGrid: Vue.component('book-grid', BookGrid),
        contentChapterPage: Vue.component(
            'content-chapter-page',
            ContentChapterPage
        ),
        drawerChapterPage: Vue.component(
            'drawer-chapter-page',
            DrawerChapterPage
        ),
        shareSocialBar: Vue.component('share-social-bar', ShareSocialBar),
        navAppDrawer: Vue.component('nav-app-drawer', NavAppDrawer),
        syntaxErrorReportDialog: Vue.component(
            'syntax-error-report-dialog',
            SyntaxErrorReportDialog
        ),
        notFoundPlaceholder: Vue.component(
            'not-found-placeholder',
            NotFoundPlaceholder
        )
    },
    directives: {
        treeItem: Vue.directive('tree-item', TreeDirective),
        selection: Vue.directive('selection', SelectionDerective)
    },
    // props: [],
    // data () {
    //     return {};
    // },
    computed: {
        ...mapGetters('note-contents', [
            'isChapterExist',
            'bookCurrentChapterContent',
            'isBookContentsLoad',
            'bookChapterIndex',
            'bookChapterLength'
        ]),
        ...mapGetters(['isGlobalProgressBar', 'isNotFoundRoute'])
    },
    beforeRouteUpdate(this: any, to, from, next) {
        let { chapter: toChapter, subchapter: toSubchapter } = to.params;
        let { chapter: fromChapter, subchapter: fromSubchapter } = from.params;

        let isGoToSubPathOfCurrentPath = toChapter === fromChapter;
        let isGoNewPath = !isGoToSubPathOfCurrentPath;

        if (isGoToSubPathOfCurrentPath) {
            this.scrollBookContentBy(toSubchapter);
        } else if (isGoNewPath) {
            this.changeRoute(toChapter, toSubchapter);
        }

        next();
    },
    async created(this: any) {
        if (!this.isNotFoundRoute) {
            this.createRoute();
        }
    },
    destroyed(this: any) {
        if (this.isNotFoundRoute) {
            this.deactivateNotFoundRouterFlag();
        }
    },
    methods: {
        ...mapActions('note-contents', [
            'bookLoadChapterByName',
            'bookContentsLoad'
        ]),
        ...mapActions([
            'hideGlobalProgressBar',
            'deactivateNotFoundRouterFlag',
            'scrollBookContentBy',
            'scrollBookContentTo'
        ]),

        createRoute(this: any) {
            let { chapter, subchapter } = this.$route.params;

            this.changeRoute(chapter, subchapter, this.isGlobalProgressBar);
        },
        changeRoute(
            this: any,
            chapterId: string,
            subchapterId: string,
            isFirstVisit: boolean
        ) {
            let isRouteExistValid = this.isChapterExist(
                chapterId,
                subchapterId
            );

            if (!isRouteExistValid) {
                this.$router.back();
            } else if (this.isGlobalProgressBar) {
                this.hideGlobalProgressBar();
            }

            this.bookLoadChapterByName(chapterId);
        }
    },
    watch: {
        bookCurrentChapterContent(this: any) {
            if (this.$route.params.subchapter === undefined) {
                this.scrollBookContentTo({ x: 0, y: 0 });
            }
        },
        isBookContentsLoad(this: any) {
            this.createRoute();
        }
    }
};

export default component;
