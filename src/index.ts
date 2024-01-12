import {App} from "vue";
import {default as itemCrud} from "./lib-components/LktItemCrud.vue";

import "./../lkt-item-crud.css";
import LktButton from "lkt-button";
import LktHttpInfo from "lkt-http-info";
import LktLoader from "lkt-loader";

const LktItemCrud = {
    install: (app: App, options = {}) => {
        // Register plugin components
        if (app.component('lkt-item-crud') === undefined) app.component('lkt-item-crud', itemCrud);

        // Register additional components
        if (app.component('lkt-button') === undefined)  app.use(LktButton);
        if (app.component('lkt-http-info') === undefined)  app.use(LktHttpInfo);
        if (app.component('lkt-loader') === undefined)  app.use(LktLoader);
    },
};
export default LktItemCrud;