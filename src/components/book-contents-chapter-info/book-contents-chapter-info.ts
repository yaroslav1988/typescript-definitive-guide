import { mapActions } from 'vuex';
import { Collapses } from '../../enums/Collapses';
import Vue, { ComponentOptions } from 'vue';

/// TODO [refactoring] take code to initialization level
import { copyToBufferWithPrefixDecorator } from "@/utils/copy-to-buffer";
import {AppConfig} from '@/facade'

export interface IComponent extends Vue {}

/// TODO [refactoring] take code to initialization level
const copyToBuffer = copyToBufferWithPrefixDecorator( AppConfig.book.content + '/' );

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
        ...mapActions(['copyToBuffer']),
        toggleCollapseContents(this: any) {
            this.$emit('collapse');
        },
        toBuffer(this:any, url: string){
            console.log( url );
            copyToBuffer( url );
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

// http://192.168.0.226:1234/book/chapters/Ekskurs-v-tipizaciu-Svyazyvanie-tipizaciya-vyvod-tipov/Leksicheskii-analiz-tokenizaciya-tokenizing
// http://192.168.0.226:1234/book/contents/Ekskurs-v-tipizaciu-Svyazyvanie-tipizaciya-vyvod-tipov/Leksicheskii-analiz-tokenizaciya-tokenizing
