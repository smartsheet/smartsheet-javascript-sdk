export enum ParentResultType {
  Workspace = 'workspace',
  Sheet = 'sheet',
  Folder = 'folder',
}

export enum SearchResultType {
  Row = 'row',
  Dashboard = 'dashboard',
  Discussion = 'discussion',
  Folder = 'folder',
  Report = 'report',
  Sheet = 'sheet',
  SummaryField = 'summaryField',
  Template = 'template',
  Workspace = 'workspace',
}

export interface SearchResult {
  // search result object id.
  objectId: number;
  // piece of text that is relevant to the query from the search result.
  text: string;
  // search result object type
  objectType: SearchResultType;
  // object id of the parent sheet, folder, or workspace that contains the search result.
  parentObjectId: number;
  //  name of the parent sheet, folder, or workspace of the search result.
  parentObjectName: string;
  // search result parent object type.
  parentObjectType: ParentResultType;
}

export interface SearchResponse {
  totalCount: number;
  results: SearchResult[];
}

export interface SearchAllOptions {
  // when specified with the value of `personalWorkspace` it limits the response to only items in the user's personal workspace.
  location?: string;
  // when specified with a datetime in ms will only show results modified since that time.
  modifiedSince?: string;
  // Text to search for
  query: string;
  // when specified results will be limited to the passed scopes.
  scopes?: SearchResultType[];
}

export interface SearchSheetOptions extends SearchAllOptions {
  // id of the sheet to search within.
  sheetId: string;
}

export interface SearchApi {
  searchAll: (options: SearchAllOptions) => Promise<SearchResponse>;
  searchSheet: (options: SearchSheetOptions) => Promise<SearchResponse>;
}
