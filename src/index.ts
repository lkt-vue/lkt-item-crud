import {App} from "vue";
import {default as itemCrud} from "./lib-components/LktItemCrud.vue";


const LktItemCrud = {
    install: (app: App, options = {}) => {

        app
            .component('LktItemCrud', itemCrud)
        ;
    },
};


export {ViewMode} from "./enums/ViewMode";
export default LktItemCrud;