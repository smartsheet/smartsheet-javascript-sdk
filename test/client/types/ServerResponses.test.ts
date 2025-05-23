import 'should';
import { errorCodes, SmartsheetErrorResponseData } from '../../../lib/client/types/ServerResponses';

describe('ServerResponses types', function() {
  describe('errorCodes', function() {
    it('should have RATE_LIMIT value', function() {
      errorCodes.RATE_LIMIT.should.equal(4001);
    });
    
    it('should have GATEWAY_TIMEOUT value', function() {
      errorCodes.GATEWAY_TIMEOUT.should.equal(4002);
    });
    
    it('should have INTERNAL_SERVER_ERROR value', function() {
      errorCodes.INTERNAL_SERVER_ERROR.should.equal(4003);
    });
    
    it('should have SERVICE_UNAVAILABLE value', function() {
      errorCodes.SERVICE_UNAVAILABLE.should.equal(4004);
    });
  });
  
  describe('SmartsheetErrorResponseData', function() {
    it('should be able to create an instance with required properties', function() {
      // This is just a type test, not a runtime test
      const errorData: SmartsheetErrorResponseData = {
        errorCode: 4001,
        message: 'Rate limit exceeded',
        refId: 'ref-123',
        detail: { additionalInfo: 'Some details' }
      };
      
      errorData.should.have.property('errorCode', 4001);
      errorData.should.have.property('message', 'Rate limit exceeded');
      errorData.should.have.property('refId', 'ref-123');
      errorData.should.have.property('detail');
      (errorData.detail as any).should.have.property('additionalInfo', 'Some details');
    });
    
    it('should allow additional properties', function() {
      const errorData: SmartsheetErrorResponseData = {
        errorCode: 4001,
        message: 'Rate limit exceeded',
        customProperty: 'custom value'
      };
      
      errorData.should.have.property('customProperty', 'custom value');
    });
  });
});