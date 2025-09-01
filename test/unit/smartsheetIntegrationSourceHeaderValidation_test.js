const should = require('should');
const { createClient } = require('../..');

describe('SmartsheetIntegrationSource Header Validation', function() {
  describe('Mandatory Header', function() {
    it('should throw error when smartsheetIntegrationSource is missing from client creation', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/'
        });
      }).should.throw('Smartsheet integration source cannot be null');
    });

    it('should throw error when smartsheetIntegrationSource is null in client creation', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: null
        });
      }).should.throw('Smartsheet integration source cannot be null');
    });

    it('should throw error when smartsheetIntegrationSource is undefined in client creation', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: undefined
        });
      }).should.throw('Smartsheet integration source cannot be null');
    });
  });

  describe('Header Format Validation', function() {
    it('should throw error for invalid format - missing parts', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'AI,MyOrg'
        });
      }).should.throw('Invalid smartsheet integration source format');
    });

    it('should throw error for invalid format - too many parts', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'AI,MyOrg,MyGPT,Extra'
        });
      }).should.throw('Invalid smartsheet integration source format');
    });

    it('should throw error for invalid type', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'INVALID,MyOrg,MyGPT'
        });
      }).should.throw('Invalid smartsheet integration source format. The integration type has to be one of the following: AI, SCRIPT, APPLICATION');
    });

    it('should throw error for empty integrator name', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'AI,MyOrg,'
        });
      }).should.throw('Invalid smartsheet integration source format. The integrator name cannot be empty.');
    });
  });

  describe('Valid Headers', function() {
    it('should accept valid AI integration source', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'AI,MyOrg,MyGPT'
        });
      }).should.not.throw();
    });

    it('should accept valid SCRIPT integration source', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'SCRIPT,MyOrg,MyGPT'
        });
      }).should.not.throw();
    });

    it('should accept valid APPLICATION integration source', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'APPLICATION,MyOrg,MyGPT'
        });
      }).should.not.throw();
    });

    it('should accept empty organization name', function() {
      (function() {
        createClient({
          accessToken: 'test-token',
          baseUrl: 'https://api.test.smartsheet.com/2.0/',
          smartsheetIntegrationSource: 'AI,,MyGPT'
        });
      }).should.not.throw();
    });
  });
});
