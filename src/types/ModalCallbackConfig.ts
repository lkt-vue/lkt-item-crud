import {LktObject} from "lkt-ts-interfaces";

export type ModalCallbackConfig = {
    modalName: string,
    modalKey?: '_' | string | number,
    action: 'refresh' | 'close' | 'reOpen' | 'exec' | 'open',
    method?: string,
    args?: LktObject
}