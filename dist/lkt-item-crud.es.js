import o from "lkt-button";
import n from "lkt-http-info";
import e from "lkt-loader";
const i = {
  install: (t, m = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", i), t.component("lkt-button") === void 0 && t.use(o), t.component("lkt-http-info") === void 0 && t.use(n), t.component("lkt-loader") === void 0 && t.use(e);
  }
};
export {
  i as default
};
