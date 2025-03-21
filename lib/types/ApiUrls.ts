import { ApiResource, apiUrlByResource } from "../utils/apis";

// Map of ApiResource to path
export type ApiUrlPathByResource = typeof apiUrlByResource;

// Valid paths for Api Resources
export type ApiUrlPath = ApiUrlPathByResource[ApiResource];
