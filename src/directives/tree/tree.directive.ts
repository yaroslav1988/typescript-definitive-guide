import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
    bind(element: HTMLElement) {
        Object.assign(element.style, {
            // whiteSpace: 'pre',
            wordWrap: 'normal',

            display: 'inline-blocl'
            // margin: '8px 0',
            // position: 'absolute'
        });
    },
    inserted(element: HTMLElement) {
    },
    unbind(element: HTMLElement) {}
};

export default directive;
