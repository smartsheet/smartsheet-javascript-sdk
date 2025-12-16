import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

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
  // array of context data strings relevant to the search query.
  contextData: string[];
  // favorite indicates whether the search result is marked as a favorite by the user.
  favorite: boolean;
  // search result object id.
  objectId: number;
  // piece of text that is relevant to the query from the search result.
  text: string;
  // search result object type
  objectType: SearchResultType;
  // indicates whether the parent object of the search result is marked as a favorite by the user.
  parentObjectFavorite: boolean;
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

export interface SearchQueryParameters {
  // text to search for
  query: string;
  // when specified with the value of `personalWorkspace` it limits the response to only items in the user's personal workspace.
  location?: string;
  // when specified with a datetime in ms will only show results modified since that time.
  modifiedSince?: string;
  // when specified results will be limited to the passed scopes.
  scopes?: string;
  // When specified with a value of favoriteFlag, response indicates which returned items are favorites. favorite -- dashboards, folders, reports, sheets, templates, and workspaces will have the property favorite: true parentObjectFavorite -- attachments, discussions, summary fields, and rows will have the property parentObjectFavorite: true
  include?: string;
}

export interface SearchSheetQueryParameters {
  // text to search for
  query: string;
}

export interface SearchSheetOptions extends RequestOptions<SearchSheetQueryParameters, undefined> {
  // id of the sheet to search within.
  sheetId: string;
}

export interface SearchApi {
  searchAll: (
    options: RequestOptions<SearchQueryParameters, undefined>,
    callback?: RequestCallback<SearchResponse>
  ) => Promise<SearchResponse>;
  searchSheet: (options: SearchSheetOptions, callback?: RequestCallback<SearchResponse>) => Promise<SearchResponse>;
}
