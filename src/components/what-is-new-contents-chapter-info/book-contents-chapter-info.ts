import { mapActions } from 'vuex';
import { Collapses } from '../../enums/Collapses';
import Vue, { ComponentOptions } from 'vue';


/// TODO [refactoring] take code to initialization level
import { copyToBufferWithPrefixDecorator } from '@/utils/copy-to-buffer';
import { AppConfig } from '@/facade';

export interface IComponent extends Vue {}

/// TODO [refactoring] take code to initialization level
const copyToBuffer = copyToBufferWithPrefixDecorator(
    AppConfig.note.chapters + '/'
);

const component: ComponentOptions<IComponent> = {
    // components: {}
    name: 'book-contents-chapter-info',
    props: ['index', 'title', 'url', 'isNode', 'isCollapsed'],
    data() {
        return {
            collapse: Collapses.Collapsed
        };
    },
    computed: {},
    // mounted () {
    //
    // },
    methods: {
        ...mapActions([
            'showAppSnackbar',
            'copyToBuffer',
        ]),
        toggleCollapseContents(this: any) {
            this.$emit('collapse');
        },
        toBuffer(this: any, url: string) {
            copyToBuffer(url);
            this.showAppSnackbar( AppConfig.messages.COPY_LINK_TO_BUFFER );
        }
    },
    watch: {
        isCollapsed(this: any) {
            this.collapse = this.isCollapsed
                ? Collapses.Collapsed
                : Collapses.Uncollapsed;
        }
    }
};

export default component;
