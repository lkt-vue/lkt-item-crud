import {App} from "vue";
import {default as itemCrud} from "./lib-components/LktItemCrud.vue";

import "./../lkt-item-crud.css";

const LktItemCrud = {
    install: (app: App, options = {}) => {
        app.component('LktItemCrud', itemCrud);
    },
};
export default LktItemCrud;