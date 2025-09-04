const should = require('should');
const { SmartsheetIntegrationSourceType, isValidFormat, isValidType } = require('../../lib/utils/smartsheetIntegrationSourceValidator');

describe('SmartsheetIntegrationSourceValidator', function() {
  describe('SmartsheetIntegrationSourceType enum', function() {
    it('should have the correct enum values', function() {
      SmartsheetIntegrationSourceType.AI.should.equal('AI');
      SmartsheetIntegrationSourceType.SCRIPT.should.equal('SCRIPT');
      SmartsheetIntegrationSourceType.APPLICATION.should.equal('APPLICATION');
      SmartsheetIntegrationSourceType.PERSONAL_ACCOUNT.should.equal('PERSONAL_ACCOUNT');
    });
  });

  describe('isValidType', function() {
    it('should return true for valid types', function() {
      isValidType('AI').should.be.true();
      isValidType('ai').should.be.true();
      isValidType('SCRIPT').should.be.true();
      isValidType('script').should.be.true();
      isValidType('APPLICATION').should.be.true();
      isValidType('application').should.be.true();
      isValidType('PERSONAL_ACCOUNT').should.be.true();
      isValidType('personal_account').should.be.true();
    });

    it('should return false for invalid types', function() {
      isValidType('INVALID').should.be.false();
      isValidType('').should.be.false();
      isValidType(null).should.be.false();
      isValidType(undefined).should.be.false();
    });
  });

  describe('isValidFormat', function() {
    it('should validate correct format', function() {
      isValidFormat('AI,MyCompany,MyGPT').should.be.true();
      isValidFormat('SCRIPT,MyOrg,MyScript').should.be.true();
      isValidFormat('APPLICATION,Company,AppName').should.be.true();
      isValidFormat('PERSONAL_ACCOUNT,MyAccount,MyTool').should.be.true();
      isValidFormat('AI,,MyGPT').should.be.true(); // Empty organization name is allowed
    });

    it('should throw error for null input', function() {
      (function() {
        isValidFormat(null);
      }).should.throw('Smartsheet integration source cannot be null');
    });

    it('should throw error for undefined input', function() {
      (function() {
        isValidFormat(undefined);
      }).should.throw('Smartsheet integration source cannot be null');
    });

    it('should throw error for wrong number of parts', function() {
      (function() {
        isValidFormat('AI,MyCompany');
      }).should.throw('Invalid smartsheet integration source format. Expected format: \'TYPE,ORGANIZATION,INTEGRATOR. https://developers.smartsheet.com/api/smartsheet/guides/basics/http-and-rest#http-headers');

      (function() {
        isValidFormat('AI,MyCompany,MyGPT,Extra');
      }).should.throw('Invalid smartsheet integration source format. Expected format: \'TYPE,ORGANIZATION,INTEGRATOR. https://developers.smartsheet.com/api/smartsheet/guides/basics/http-and-rest#http-headers');
    });

    it('should throw error for invalid integration type', function() {
      (function() {
        isValidFormat('INVALID,MyCompany,MyGPT');
      }).should.throw('Invalid smartsheet integration source format. The integration type has to be one of the following: AI, SCRIPT, APPLICATION, PERSONAL_ACCOUNT. Invalid integration type: INVALID https://developers.smartsheet.com/api/smartsheet/guides/basics/http-and-rest#http-headers');
    });

    it('should throw error for empty integrator name', function() {
      (function() {
        isValidFormat('AI,MyCompany,');
      }).should.throw('Invalid smartsheet integration source format. The integrator name cannot be empty.');
    });
  });
});
