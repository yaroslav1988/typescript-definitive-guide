import { mapActions, mapGetters } from 'vuex';
import Vue, { ComponentOptions } from 'vue';

export interface IComponent extends Vue {}

const component: ComponentOptions<IComponent> = {
    computed: {
        ...mapGetters('book-contents', [
            'isCurrentChapterContentLoaded',
            'bookCurrentChapterName',
            'bookCurrentChapterIndex',
            'bookChapterTotalIndex'
        ]),
        ...mapGetters([
            'appTelegramChanelLink',
            'yandexDonateLink',
            'githubRepositoryLink',

            'BASE_URL',
            'ORIGIN'
        ]),
        isPageWithoutDrawer(this: any) {
            return this.$route.name === 'home';
        },
        isPageWithChapterInfo(this: any) {
            return this.$route.name === 'chapter';
        },
        bookChapterIndex(this: any) {
            return `${this.bookCurrentChapterIndex + 1}/${
                this.bookChapterTotalIndex
            }`;
        }
    },
    methods: {
        ...mapActions([
            'toggleAppDrawer',

            'showAuthorContactDialog',
            'hideAuthorContactDialog',

            'showBugReportHelperDialog',
            'hideBugReportHelperDialog'
        ])
    }
};

export default component;
