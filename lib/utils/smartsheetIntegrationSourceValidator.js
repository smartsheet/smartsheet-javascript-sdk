/**
 * Smartsheet Integration Source Validator
 * 
 * Validates smartsheet integration source strings in the format:
 * type, organisation name, integrator name
 * 
 * - type: must be one of the enum values
 * - organisation name: optional (can be empty)
 * - integrator name: non-empty
 */

const { SmartsheetIntegrationSourceType } = require('./smartsheetIntegrationSourceType');

const documentationLink = "https://developers.smartsheet.com/api/smartsheet/guides/basics/http-and-rest#http-headers";

/**
 * Validates a smartsheet integration source string
 * @param {string} inputValue - The integration source string to validate
 * @returns {boolean} - True if valid, throws exception if invalid
 * @throws {Error} - If validation fails
 */
function isValidFormat(inputValue) {
  if (inputValue === null || inputValue === undefined) {
    throw new Error('Smartsheet integration source cannot be null');
  }

  const parts = inputValue.split(',', -1); // -1 keeps empty slots
  if (parts.length !== 3) {
    throw new Error('Invalid smartsheet integration source format. ' +
      'Expected format: \'TYPE,ORGANIZATION,INTEGRATOR. ' + documentationLink);
  }

  const integrationType = parts[0];
  const integratorName = parts[2];

  if (!isValidType(integrationType)) {
    const allowed = Object.values(SmartsheetIntegrationSourceType).join(', ');
    throw new Error('Invalid smartsheet integration source format. ' +
      'The integration type has to be one of the following: ' + allowed +
      '. Invalid integration type: ' + integrationType + ' ' + documentationLink);
  }

  if (integratorName === '') {
    throw new Error('Invalid smartsheet integration source format. ' +
      'The integrator name cannot be empty.');
  }

  return true;
}

/**
 * Checks if the integration type is valid
 * @param {string} integrationTypeValue - The integration type to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidType(integrationTypeValue) {
  if (!integrationTypeValue || integrationTypeValue === '') {
    return false;
  }
  
  const upperValue = integrationTypeValue.toUpperCase();
  return Object.values(SmartsheetIntegrationSourceType).includes(upperValue);
}

module.exports = {
  SmartsheetIntegrationSourceType,
  isValidFormat,
  isValidType
};
