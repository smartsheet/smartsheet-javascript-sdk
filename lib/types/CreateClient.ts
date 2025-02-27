import { CreateClientOptions } from "./CreateClientOptions";
import { SmartsheetClient } from "./SmartsheetClient";

export type CreateClient = (options?: CreateClientOptions) => SmartsheetClient;
