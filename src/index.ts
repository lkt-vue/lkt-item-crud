import {App, Plugin} from "vue";
import {default as itemCrud} from "./lib-components/LktItemCrud.vue";

import "./../lkt-item-crud.css";

const LktItemCrud: Plugin = {
    install: (app: App, options = {}) => {
        // Register plugin components
        if (app.component('lkt-item-crud') === undefined) app.component('lkt-item-crud', itemCrud);
    },
};
export default LktItemCrud;

export {debugLktItemCrud} from "./functions/debug";