import Vue, { ComponentOptions } from 'vue';

export type ComponentFactory<Data, Component extends Vue> = (
    data: Data
) => ComponentOptions<Component>;
