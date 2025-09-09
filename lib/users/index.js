var _ = require('underscore');
var alternateEmails = require('./alternateemails.js');

exports.create = function (options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.users,
  };
  _.extend(optionsToSend, options.clientOptions);

  var listAllUsers = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var getCurrentUser = (getOptions, callback) => {
    var urlOptions = { url: options.apiUrls.users + 'me' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addUser = (postOptions, callback) => requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var addUserAndSendEmail = (postOptions, callback) =>
    addUser(_.extend({}, postOptions, { queryParameters: { sendEmail: true } }), callback);

  var updateUser = (putOptions, callback) => requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  var getUserPlans = (getOptions, callback) => {
    var urlOptions = { url: buildGetUserPlansUrl(getOptions) };
    var requestOptions = _.extend({}, optionsToSend, urlOptions, getOptions);
    return requestor.get(requestOptions, callback);
  };

  var deleteUserFromPlan = (deleteOptions, callback) => {
    var urlOptions = { url: buildDeleteUserFromPlanUrl(deleteOptions) };
    var requestOptions = _.extend({}, optionsToSend, urlOptions, deleteOptions);
    return requestor.delete(requestOptions, callback);
  }

  var listUsers = (getOptions, callback) => {
    var urlOptions = { url: buildGetUserUrl() };
    var requestOptions = _.extend({}, optionsToSend, urlOptions, getOptions);
    
    requestOptions.queryParameters = requestOptions.queryParameters || {};
    ['planId', 'seatType', 'emails', 'pageSize', 'page', 'numericDates'].forEach(key => {
      if (getOptions[key] !== undefined) {
        requestOptions.queryParameters[key] = getOptions[key];
      }
    });

    return requestor.get(requestOptions, callback);
  }

  var removeUser = (deleteOptions, callback) => requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  var deactivateUser = (postOptions, callback) => {
    var urlOptions = { url: buildDeactivateUserUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var reactivateUser = (postOptions, callback) => {
    var urlOptions = { url: buildReactivateUserUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addProfileImage = (postOptions, callback) => {
    var urlOptions = { url: buildProfileImageUrl(postOptions) };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildProfileImageUrl = (urlOptions) => options.apiUrls.users + urlOptions.userId + '/profileimage';

  var buildDeactivateUserUrl = (urlOptions) => options.apiUrls.users + urlOptions.userId + '/deactivate';

  var buildReactivateUserUrl = (urlOptions) => options.apiUrls.users + urlOptions.userId + '/reactivate';

  var buildGetUserPlansUrl = (urlOptions) => options.apiUrls.users + urlOptions.userId + '/plans';

  var buildDeleteUserFromPlanUrl = (urlOptions) => options.apiUrls.users + urlOptions.userId + '/plans/' + urlOptions.planId;

  var buildGetUserUrl = () => options.apiUrls.users;


  var userObject = {
    getUser: listAllUsers,
    listAllUsers: listAllUsers,
    getCurrentUser: getCurrentUser,
    addUser: addUser,
    addUserAndSendEmail: addUserAndSendEmail,
    updateUser: updateUser,
    getUserPlans: getUserPlans,
    deleteUserFromPlan: deleteUserFromPlan,
    listUsers: listUsers,
    removeUser: removeUser,
    deactivateUser: deactivateUser,
    reactivateUser: reactivateUser,
    addProfileImage: addProfileImage,
  };

  _.extend(userObject, alternateEmails.create(options));

  return userObject;
};
