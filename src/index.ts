import {App, Plugin} from "vue";
import {default as itemCrud} from "./lib-components/LktItemCrud.vue";

import "./../lkt-item-crud.css";
import {Settings} from "./settings/Settings";

const LktItemCrud: Plugin = {
    install: (app: App, options = {}) => {
        // Register plugin components
        if (app.component('lkt-item-crud') === undefined) app.component('lkt-item-crud', itemCrud);
    },
};
export default LktItemCrud;

export {debugLktItemCrud} from "./functions/debug";

export const setItemCrudDefaultSaveIcon = (icon: string) => {
    Settings.defaultSaveIcon = icon;
}

export const setItemCrudDefaultDropIcon = (icon: string) => {
    Settings.defaultDropIcon = icon;
}