import { mapActions, mapGetters } from 'vuex';

import SharedComponents from '../../pages/shared/shared';
import AppBarComponents from '../../pages/shared/app-bar';
import TouchDetecter from '@/utils/TouchDetecter';

import AutoFocusDirective from '@/directives/auto-focus/auto-focus.directive';
import Vue from 'vue';

export default {
    name:'app-snackbar',
    // props: [],
    data() {
        return {
            position: 'left',
            duration: 1500,
            isShow: false
        };
    },
    computed: {
        ...mapGetters([
            'isShowAppSnackbar',
            'messageAppSnackbar',
        ])
    },
    // mounted () {
    //
    // },
    methods: {
        ...mapActions([
            'hideAppSnackbar',
        ]),
    },
    watch: {
        isShowAppSnackbar(this:any, isShowAppSnackbar:boolean){
            if(isShowAppSnackbar!==this.isShow){
                this.isShow = isShowAppSnackbar;
            }
        },
        isShow(this:any, isShow:boolean){
            if(isShow!==this.isShowAppSnackbar && !isShow){
                this.hideAppSnackbar();
            }
        }
    }
};
