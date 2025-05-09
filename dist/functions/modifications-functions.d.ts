import { FormConfig, LktObject } from 'lkt-vue-kernel';
import { DataState } from 'lkt-data-state';
export declare const getModificationsDataState: (value: LktObject, modifications: LktObject, form: FormConfig) => DataState;
export declare const detectFormFieldsKeys: (form: FormConfig) => string[];
