import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { AlternateEmail } from './types';
import type {
  AlternateEmailsApi,
  AddAlternateEmailOptions,
  AddAlternateEmailResponse,
  GetAlternateEmailOptions,
  ListAlternateEmailsOptions,
  ListAlternateEmailsResponse,
  MakeAlternateEmailPrimaryOptions,
  MakeAlternateEmailPrimaryResponse,
  DeleteAlternateEmailOptions,
} from './alternateemails_types';

export function create(options: CreateOptions): AlternateEmailsApi {
  const requestor = options.requestor;
  const optionsToSend = { ...options.clientOptions };

  const addAlternateEmail = (
    postOptions: AddAlternateEmailOptions,
    callback?: RequestCallback<AddAlternateEmailResponse>
  ): Promise<AddAlternateEmailResponse> => {
    const urlOptions = { url: buildUrl(postOptions.userId) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const getAlternateEmail = (
    getOptions: GetAlternateEmailOptions,
    callback?: RequestCallback<AlternateEmail>
  ): Promise<AlternateEmail> => {
    const urlOptions = { url: buildUrl(getOptions.userId, getOptions.alternateEmailId) };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const listAlternateEmails = (
    getOptions: ListAlternateEmailsOptions,
    callback?: RequestCallback<ListAlternateEmailsResponse>
  ): Promise<ListAlternateEmailsResponse> => {
    const urlOptions = { url: buildUrl(getOptions.userId) };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const makeAlternateEmailPrimary = (
    postOptions: MakeAlternateEmailPrimaryOptions,
    callback?: RequestCallback<MakeAlternateEmailPrimaryResponse>
  ): Promise<MakeAlternateEmailPrimaryResponse> => {
    const urlOptions = {
      url: buildUrl(postOptions.userId, postOptions.alternateEmailId) + '/makeprimary',
    };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const deleteAlternateEmail = (
    deleteOptions: DeleteAlternateEmailOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: buildUrl(deleteOptions.userId, deleteOptions.alternateEmailId) };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const buildUrl = (userId: number, alternateEmailId?: number): string => {
    return (
      options.apiUrls.users +
      '/' +
      userId +
      '/alternateemails' +
      (alternateEmailId !== undefined ? '/' + alternateEmailId : '')
    );
  };

  return {
    addAlternateEmail,
    getAlternateEmail,
    listAlternateEmails,
    makeAlternateEmailPrimary,
    deleteAlternateEmail,
  };
}
