import 'should';
import {
  ApiHost,
  isSupportedLogLevel,
  SUPPORTED_LOG_LEVELS,
  DEFAULT_LOG_LEVEL,
  DEFAULT_RETRY_CONFIG,
  DEFAULT_LOGGING_CONFIG
} from '../../../lib/client/types/clientConfiguration';

describe('clientConfiguration types', function() {
  describe('ApiHost', function() {
    it('should have DEFAULT value', function() {
      ApiHost.DEFAULT.should.equal('https://api.smartsheet.com/2.0/');
    });
    
    it('should have GOV value', function() {
      ApiHost.GOV.should.equal('https://api.smartsheetgov.com/2.0/');
    });
    
    it('should have EU value', function() {
      ApiHost.EU.should.equal('https://api.smartsheet.eu/2.0/');
    });
  });
  
  describe('isSupportedLogLevel', function() {
    it('should return true for supported log levels', function() {
      SUPPORTED_LOG_LEVELS.forEach(level => {
        isSupportedLogLevel(level).should.be.true();
      });
    });
    
    it('should return false for unsupported log levels', function() {
      isSupportedLogLevel('not-a-level').should.be.false();
    });
  });
  
  describe('DEFAULT_LOG_LEVEL', function() {
    it('should be a supported log level', function() {
      SUPPORTED_LOG_LEVELS.should.containEql(DEFAULT_LOG_LEVEL);
    });
    
    it('should be "warn"', function() {
      DEFAULT_LOG_LEVEL.should.equal('warn');
    });
  });
  
  describe('DEFAULT_RETRY_CONFIG', function() {
    it('should have maxRetries property', function() {
      DEFAULT_RETRY_CONFIG.should.have.property('maxRetries');
      (DEFAULT_RETRY_CONFIG.maxRetries as number).should.be.a.Number();
    });
  });
  
  describe('DEFAULT_LOGGING_CONFIG', function() {
    it('should have logLevel property', function() {
      DEFAULT_LOGGING_CONFIG.should.have.property('logLevel');
      (DEFAULT_LOGGING_CONFIG.logLevel as string).should.be.a.String();
    });
    
    it('should use DEFAULT_LOG_LEVEL', function() {
      (DEFAULT_LOGGING_CONFIG.logLevel as string).should.equal(DEFAULT_LOG_LEVEL);
    });
  });
});
