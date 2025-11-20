import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  WebhooksApi,
  CreateWebhookResponse,
  GetWebhookOptions,
  ListWebhooksResponse,
  UpdateWebhookOptions,
  UpdateWebhookResponse,
  DeleteWebhookOptions,
  DeleteWebhookResponse,
  ResetSharedSecretOptions,
  ResetSharedSecretResponse,
  CreateWebhookBody,
  Webhook,
  ListWebhooksQueryParameters,
} from './types';

export function create(options: CreateOptions): WebhooksApi {
  const requestor = options.requestor;

  const optionsToSend = {
    ...options.clientOptions,
  };

  const createWebhook = (
    postOptions: RequestOptions<undefined, CreateWebhookBody>,
    callback?: RequestCallback<CreateWebhookResponse>
  ) => {
    const urlOptions = { url: buildUrl() };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const deleteWebhook = (deleteOptions: DeleteWebhookOptions, callback?: RequestCallback<DeleteWebhookResponse>) => {
    const urlOptions = { url: buildUrl(deleteOptions.webhookId) };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const updateWebhook = (putOptions: UpdateWebhookOptions, callback?: RequestCallback<UpdateWebhookResponse>) => {
    const urlOptions = { url: buildUrl(putOptions.webhookId) };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const getWebhook = (getOptions: GetWebhookOptions, callback?: RequestCallback<Webhook>) => {
    const urlOptions = { url: buildUrl(getOptions.webhookId) };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const listWebhooks = (
    getOptions: RequestOptions<ListWebhooksQueryParameters, undefined>,
    callback?: RequestCallback<ListWebhooksResponse>
  ) => {
    const urlOptions = { url: buildUrl() };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const resetSharedSecret = (
    postOptions: ResetSharedSecretOptions,
    callback?: RequestCallback<ResetSharedSecretResponse>
  ) => {
    const urlOptions = { url: buildUrl(postOptions.webhookId) + '/resetsharedsecret' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const buildUrl = (webhookId?: number) => {
    if (webhookId !== undefined) {
      return options.apiUrls.webhooks + '/' + webhookId;
    }
    return options.apiUrls.webhooks;
  };

  return {
    createWebhook: createWebhook,
    getWebhook: getWebhook,
    listWebhooks: listWebhooks,
    deleteWebhook: deleteWebhook,
    updateWebhook: updateWebhook,
    resetSharedSecret: resetSharedSecret,
  };
}
