import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const deleteAutomationRule = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const getAutomationRule = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listAutomationRules = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const updateAutomationRule = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/automationrules';
    if (urlOptions.automationRuleId !== undefined) {
      url += '/' + urlOptions.automationRuleId;
    }
    return url;
  };

  return {
    deleteAutomationRule: deleteAutomationRule,
    getAutomationRule: getAutomationRule,
    listAutomationRules: listAutomationRules,
    updateAutomationRule: updateAutomationRule,
  };
}
