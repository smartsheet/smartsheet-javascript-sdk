import * as sinon from 'sinon';
import 'should';
import { AxiosRequestConfig } from 'axios';
import {
  withRedactedHeaders,
  withRedactedPayload,
  withRedactedQueryParams,
  getSanitizedUrlForLogs,
} from '../../../lib/client/httpClient/logging/logSanitizer';

const assertRedaction = (val: unknown) => {
  const string = String(val)
  string.should.startWith("****")
  string.should.endWith("*1234")
}

describe('logging utils', function() {
  afterEach(function() {
    sinon.restore();
  });
  
  describe('withRedactedHeaders', function() {
    it('should redact authorization header', function() {
      // Arrange
      const headers = {
        'Authorization': 'Bearer token1234',
        'Content-Type': 'application/json'
      };
      
      // Act
      const result = withRedactedHeaders(headers);
      
      // Assert
      result.should.have.property('Authorization').not.equal(headers.Authorization);
      result.should.have.property('Content-Type', headers['Content-Type']);
      assertRedaction(result.Authorization);
    });
    
    it('should handle case insensitivity', function() {
      // Arrange
      const headers = {
        'authorization': 'Bearer token1234',
        'Content-Type': 'application/json'
      };
      
      // Act
      const result = withRedactedHeaders(headers);
      
      // Assert
      result.should.have.property('authorization').not.equal(headers.authorization);
      assertRedaction(result.authorization)
    });
    
    it('should handle empty headers object', function() {
      // Arrange
      const headers = {};
      
      // Act
      const result = withRedactedHeaders(headers);
      
      // Assert
      result.should.be.an.Object();
      Object.keys(result).should.have.length(0);
    });
  });
  
  describe('withRedactedPayload', function() {
    it('should redact access_token in payload', function() {
      // Arrange
      const payload = {
        access_token: 'secret_token1234',
        other_field: 'value'
      };
      
      // Act
      const result = withRedactedPayload(payload);
      
      // Assert
      result.should.have.property('access_token').not.equal(payload.access_token);
      assertRedaction(result.access_token)

      result.should.have.property('other_field', payload.other_field);
    });
    
    it('should redact refresh_token in payload', function() {
      // Arrange
      const payload = {
        refresh_token: 'refresh_token1234',
        other_field: 'value'
      };
      
      // Act
      const result = withRedactedPayload(payload);
      
      // Assert
      result.should.have.property('refresh_token').not.equal(payload.refresh_token);
      assertRedaction(result.refresh_token)

      result.should.have.property('other_field', payload.other_field);
    });
    
    it('should handle empty payload object', function() {
      // Arrange
      const payload = {};
      
      // Act
      const result = withRedactedPayload(payload);
      
      // Assert
      result.should.be.an.Object();
      Object.keys(result).should.have.length(0);
    });
  });
  
  describe('withRedactedQueryParams', function() {
    it('should redact sensitive query parameters', function() {
      // Arrange
      const params = {
        code: 'auth_code1234',
        client_id: 'client_id1234',
        hash: 'hash1234',
        refresh_token: 'refresh_token1234',
        other_param: 'value'
      };
      
      // Act
      const result = withRedactedQueryParams(params);
      
      // Assert
      result.should.have.property('code').not.equal(params.code);
      result.should.have.property('client_id').not.equal(params.client_id);
      result.should.have.property('hash').not.equal(params.hash);
      result.should.have.property('refresh_token').not.equal(params.refresh_token);
      assertRedaction(result.code)
      assertRedaction(result.client_id)
      assertRedaction(result.hash)
      assertRedaction(result.refresh_token)

      result.should.have.property('other_param', params.other_param);
    });
    
    it('should handle empty params object', function() {
      // Arrange
      const params = {};
      
      // Act
      const result = withRedactedQueryParams(params);
      
      // Assert
      result.should.be.an.Object();
      Object.keys(result).should.have.length(0);
    });
  });
  
  describe('getSanitizedUrlForLogs', function() {
    it('should return url when no params exist', function() {
      // Arrange
      const requestConfig: AxiosRequestConfig = {
        url: 'https://api.example.com/resource'
      };
      
      // Act
      const result = getSanitizedUrlForLogs(requestConfig);
      
      // Assert
      result.should.equal(requestConfig.url);
    });
    
    it('should append sanitized query parameters to url', function() {
      // Arrange
      const requestConfig: AxiosRequestConfig = {
        url: 'https://api.example.com/resource',
        params: {
          code: 'auth_code1234',
          other_param: 'value'
        }
      };
      
      // Act
      const result = getSanitizedUrlForLogs(requestConfig);
      
      // Assert
      result.should.startWith(requestConfig.url + '?');
      result.should.containEql('other_param=value');
      result.should.not.containEql('auth_code');
      result.should.containEql('code=***');
    });
    
    it('should handle empty url', function() {
      // Arrange
      const requestConfig: AxiosRequestConfig = {
        params: {
          code: 'auth_code1234'
        }
      };
      
      // Act
      const result = getSanitizedUrlForLogs(requestConfig);
      
      // Assert
      // The result should start with a question mark and contain the code parameter
      result.should.startWith('?');
      result.should.containEql('code=***');
      // It should not contain the original code value
      result.should.not.containEql('auth_code1234');
    });
  });
});
