import { mapGetters } from 'vuex';
import Vue, { ComponentOptions } from 'vue';

export interface IComponent extends Vue {}

const component: ComponentOptions<IComponent> = {
    computed: {
        ...mapGetters('note-contents', ['bookCurrentSubchapterAll'])
    }
};

export default component;
