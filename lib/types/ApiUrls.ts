import { ApiSection, apiUrlBySection } from "../utils/apis";

export type ApiUrlPathBySection = typeof apiUrlBySection;
export type ApiUrlPath = (typeof apiUrlBySection)[ApiSection];
