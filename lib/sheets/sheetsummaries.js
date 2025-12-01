import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const getSummary = (getOptions, callback) => {
    const urlOptions = { url: buildSummaryUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getSummaryFields = (getOptions, callback) => {
    const urlOptions = { url: buildFieldsUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const addSummaryFields = (postOptions, callback) => {
    const urlOptions = { url: buildFieldsUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const deleteSummaryFields = (deleteOptions, callback) => {
    const urlOptions = { url: buildFieldsUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const updateSummaryFields = (putOptions, callback) => {
    const urlOptions = { url: buildFieldsUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const addSummaryFieldImage = (postOptions, callback) => {
    const urlOptions = { url: buildFieldImagesUrl(postOptions) };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const buildSummaryUrl = (urlOptions) => options.apiUrls.sheets + '/' + urlOptions.sheetId + '/summary';

  const buildFieldsUrl = (urlOptions) => buildSummaryUrl(urlOptions) + '/fields';

  const buildFieldImagesUrl = (urlOptions) => buildFieldsUrl(urlOptions) + '/' + urlOptions.fieldId + '/images';

  return {
    getSummary: getSummary,
    getSummaryFields: getSummaryFields,
    addSummaryFields: addSummaryFields,
    deleteSummaryFields: deleteSummaryFields,
    updateSummaryFields: updateSummaryFields,
    addSummaryFieldImage: addSummaryFieldImage,
  };
}
