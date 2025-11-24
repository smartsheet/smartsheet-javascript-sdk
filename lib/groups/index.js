import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.groups,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listGroups = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const createGroup = (postOptions, callback) => requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  const addGroupMembers = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.groups + '/' + postOptions.groupId + '/members' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateGroup = (putOptions, callback) => {
    const urlOptions = { url: options.apiUrls.groups + '/' + putOptions.groupId };
    requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteGroup = (deleteOptions, callback) => {
    const urlOptions = { url: options.apiUrls.groups + '/' + deleteOptions.groupId };
    requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const removeGroupMember = (deleteOptions, callback) => {
    const urlOptions = {
      url: options.apiUrls.groups + '/' + deleteOptions.groupId + '/members/' + deleteOptions.userId,
    };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  return {
    listGroups: listGroups,
    getGroup: listGroups,
    createGroup: createGroup,
    addGroupMembers: addGroupMembers,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    removeGroupMember: removeGroupMember,
  };
}
