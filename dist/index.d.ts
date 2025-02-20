import { Plugin } from "vue";
import "./../lkt-item-crud.css";
declare const LktItemCrud: Plugin;
export default LktItemCrud;
export { debugLktItemCrud } from "./functions/debug";
export declare const setItemCrudDefaultSaveIcon: (icon: string) => void;
export declare const setItemCrudDefaultDropIcon: (icon: string) => void;
