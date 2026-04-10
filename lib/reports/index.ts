import shareModule from '../share/share';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  ReportsApi,
  ListReportsQueryParameters,
  ListReportsResponse,
  GetReportOptions,
  Report,
  SendReportViaEmailOptions,
  SendReportViaEmailResponse,
  GetReportAsExcelOptions,
  GetReportAsCSVOptions,
  GetReportPublishStatusOptions,
  ReportPublish,
  SetReportPublishStatusOptions,
  SetReportPublishStatusResponse,
  DeleteReportOptions,
  DeleteReportResponse,
  AddReportScopeOptions,
  RemoveReportScopeOptions,
  AddReportColumnsOptions,
  AddReportColumnsResponse,
} from './types';
import * as constants from '../utils/constants';

export function create(options: CreateOptions): ReportsApi {
  const requestor = options.requestor;

  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.reports);

  const optionsToSend = {
    url: options.apiUrls.reports,
    urls: options.apiUrls,
    ...options.clientOptions,
  };

  const listReports = (
    getOptions: RequestOptions<ListReportsQueryParameters, undefined>,
    callback?: RequestCallback<ListReportsResponse>
  ): Promise<ListReportsResponse> => {
    const urlOptions = { url: options.apiUrls.reports };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const getReport = (getOptions: GetReportOptions, callback?: RequestCallback<Report>): Promise<Report> => {
    let url = options.apiUrls.reports;
    if (getOptions?.reportId) {
      url += '/' + getOptions.reportId;
    }
    const urlOptions = { url };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const sendReportViaEmail = (
    postOptions: SendReportViaEmailOptions,
    callback?: RequestCallback<SendReportViaEmailResponse>
  ): Promise<SendReportViaEmailResponse> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + postOptions.reportId + '/emails' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const getReportAsExcel = (
    getOptions: GetReportAsExcelOptions,
    callback?: RequestCallback<Buffer>
  ): Promise<Buffer> => {
    const acceptOptions = { accept: constants.acceptHeaders.vndMsExcel, encoding: null };
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get({ ...optionsToSend, ...acceptOptions, ...urlOptions, ...getOptions }, callback);
  };

  const getReportAsCSV = (getOptions: GetReportAsCSVOptions, callback?: RequestCallback<string>): Promise<string> => {
    const acceptOptions = { accept: constants.acceptHeaders.textCsv };
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get({ ...optionsToSend, ...acceptOptions, ...urlOptions, ...getOptions }, callback);
  };

  const getReportPublishStatus = (
    getOptions: GetReportPublishStatusOptions,
    callback?: RequestCallback<ReportPublish>
  ): Promise<ReportPublish> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId + '/publish' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const setReportPublishStatus = (
    putOptions: SetReportPublishStatusOptions,
    callback?: RequestCallback<SetReportPublishStatusResponse>
  ): Promise<SetReportPublishStatusResponse> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + putOptions.reportId + '/publish' };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const deleteReport = (deleteOptions: DeleteReportOptions, callback?: RequestCallback<DeleteReportResponse>) => {
    const urlOptions = { url: options.apiUrls.reports + '/' + deleteOptions.reportId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const addReportScope = (
    postOptions: AddReportScopeOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + postOptions.reportId + '/scope' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const removeReportScope = (
    deleteOptions: RemoveReportScopeOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + deleteOptions.reportId + '/scope' };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const addReportColumns = (
    postOptions: AddReportColumnsOptions,
    callback?: RequestCallback<AddReportColumnsResponse>
  ): Promise<AddReportColumnsResponse> => {
    const urlOptions = { url: options.apiUrls.reports + '/' + postOptions.reportId + '/columns' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  return {
    listReports,
    getReport,
    sendReportViaEmail,
    getReportAsExcel,
    getReportAsCSV,
    getReportPublishStatus,
    setReportPublishStatus,
    deleteReport,
    addReportScope,
    removeReportScope,
    addReportColumns,
    ...shares.create(options),
  };
}
