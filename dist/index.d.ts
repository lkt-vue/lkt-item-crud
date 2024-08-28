import { Plugin } from "vue";
import "./../lkt-item-crud.css";
declare const LktItemCrud: Plugin;
export default LktItemCrud;
export { debugLktItemCrud } from "./functions/debug";
export declare const setItemCrudDefaultSaveIcon: (icon: any) => void;
export declare const setItemCrudDefaultDropIcon: (icon: any) => void;
