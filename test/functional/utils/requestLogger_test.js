import { smartSheetURIs } from '@smartsheet';
import { create as createRequestLogger } from '../../../lib/utils/requestLogger';
import { expect, jest, describe, beforeEach, it, beforeAll, afterAll } from '@jest/globals';

describe('#RequestLogger', () => {
    let requestLogger;
    let loggerFakes;

    beforeAll(() => {
        jest.useFakeTimers({ 
            now: new Date(0),
            doNotFake: ['performance']
        });
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.setSystemTime(new Date(0));
        loggerFakes = {
            log: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
            silly: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            filters: [],
        };
        requestLogger = createRequestLogger(loggerFakes);
    });

    describe('#log', () => {
        it('should call log on the injected logger', () => {
            requestLogger.log("info", "An info message");
            expect(loggerFakes.log.mock.calls[0]).toEqual(["info", "An info message"]);
        });
    });

    function createRequest(opts) {
        opts = opts ? opts : {};
        return {
            verb: opts.verb ? opts.verb : "GET",
            requestOptions: {
                url: opts.url ? opts.url : smartSheetURIs.defaultBaseURI,
                qs: opts.qs ? opts.qs : {},
                headers: opts.headers ? opts.headers : {},
                body: opts.body ? opts.body : "",
            },
        };
    }

    function createResponse(opts) {
        opts = opts ? opts : {};
        return {
            statusCode: opts.statusCode ? opts.statusCode : 200,
            headers: opts.headers ? opts.headers : {},
            content: opts.content ? opts.content : {},
        };
    }

    describe('#logRequest', () => {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it('should info log the request url and query params', () => {
                const request = createRequest({
                    url,
                    qs: {
                        queryKey: "queryVal",
                        "key that has spaces": "value that has spaces",
                    }
                });
                requestLogger.logRequest(request.verb, request.requestOptions);
                expect(loggerFakes.log.mock.calls[0]).toEqual(['info', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
            });
        });

        it('should not silly log any request headers when none are present', () => {
            const request = createRequest({
                headers: {}
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            expect(loggerFakes.silly.mock.calls.length).toBe(0);
        });

        it('should silly log the request headers when present', () => {
            const request = createRequest({
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Request', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization request header', () => {
            const request = createRequest({
                headers: { authorization: "SuperSecret" }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            // The censor logic leaves the last 4 characters uncensored
            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Request', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization request header', () => {
            const request = createRequest({
                headers: { authorization: "" }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Request', '{"authorization":""}']);
        });

        it(
            'should not debug nor verbose log any payload if none exists on the request',
            () => {
                const request = createRequest({
                    body: '',
                });

                requestLogger.logRequest(request.verb, request.requestOptions);

                expect(loggerFakes.debug.mock.calls.length).toBe(0);
                expect(loggerFakes.verbose.mock.calls.length).toBe(0);
            }
        );

        it('should debug log the full request payload', () => {
            const request = createRequest({
                body: 'This is the request payload!',
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            expect(loggerFakes.debug.mock.calls[0]).toEqual(['%s Payload (full): %s', 'Request', 'This is the request payload!']);
        });

        it(
            'should verbose log the full request payload if it does not exceed 1024 characters',
            () => {
                const shortPayload = Array(1024).fill("0").join("");

                const request = createRequest({
                    body: shortPayload,
                });

                requestLogger.logRequest(request.verb, request.requestOptions);

                expect(loggerFakes.verbose.mock.calls[0]).toEqual(['%s Payload (preview): %s', 'Request', shortPayload]);
            }
        );

        it(
            'should verbose log a truncated request payload if it exceeds 1024 characters',
            () => {
                const longPayload = Array(2048).fill("0").join("");

                const request = createRequest({
                    body: longPayload,
                });

                requestLogger.logRequest(request.verb, request.requestOptions);

                expect(loggerFakes.verbose.mock.calls[0][0]).toBe('%s Payload (preview): %s');
                expect(loggerFakes.verbose.mock.calls[0][1]).toBe('Request');
                const preview = loggerFakes.verbose.mock.calls[0][2];
                expect(preview.endsWith('...')).toBe(true);
                expect(preview.length).toBe(1024 + '...'.length);
            }
        );
    });

    describe('#logRetryAttempt', () => {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it('should warn log the attempt and request url and query params', () => {
                const request = createRequest({
                    url,
                    qs: {
                        queryKey: "queryVal",
                        "key that has spaces": "value that has spaces",
                    }
                });
                const error = "some error";
                const attemptNum = 3;

                requestLogger.logRetryAttempt(request.verb, request.requestOptions, error, attemptNum);

                expect(loggerFakes.warn.mock.calls[0]).toEqual(['Request failed, performing retry #%d\nCause: ', attemptNum, error]);
                expect(loggerFakes.log.mock.calls[0]).toEqual(['warn', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
            });
        });
    });

    describe('#logRetryFailure', () => {
        it('should error log the failure and attempt number', () => {
            const request = createRequest();
            const attemptNum = 3;

            requestLogger.logRetryFailure(request.verb, request.requestOptions, attemptNum);

            expect(loggerFakes.error.mock.calls[0]).toEqual(['Request failed after %d retries', attemptNum]);
        });
    });

    describe('#logSuccessfulResponse', () => {
        it('should info log the success and response status code', () => {
            const response = createResponse({
                statusCode: 201,
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.info.mock.calls[0]).toEqual(['Response: Success (HTTP %d)', 201]);
        });

        it('should not silly log any response headers when none are present', () => {
            const response = createResponse({
                headers: {}
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.silly.mock.calls.length).toBe(0);
        });

        it('should silly log the response headers when present', () => {
            const response = createResponse({
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization response header', () => {
            const response = createResponse({
                headers: { authorization: "SuperSecret" }
            });

            requestLogger.logSuccessfulResponse(response);

            // The censor logic leaves the last 4 characters uncensored
            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization response header', () => {
            const response = createResponse({
                headers: { authorization: "" }
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"authorization":""}']);
        });

        it('should not log an empty response payload', () => {
            const response = createResponse({
                content: {},
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.verbose.mock.calls.length).toBe(0);
            expect(loggerFakes.debug.mock.calls.length).toBe(0);
        });

        it('should debug log the full response payload', () => {
            const response = createResponse({
                content: { body: 'This is the request payload!' },
            });

            requestLogger.logSuccessfulResponse(response);

            expect(loggerFakes.debug.mock.calls[0]).toEqual(['%s Payload (full): %s', 'Response', '{"body":"This is the request payload!"}']);
        });

        it(
            'should verbose log the full response payload if it does not exceed 1024 characters',
            () => {
                const shortPayload = Array(512).fill("0").join("");

                const response = createResponse({
                    content: { body: shortPayload },
                });

                requestLogger.logSuccessfulResponse(response);

                expect(loggerFakes.verbose.mock.calls[0]).toEqual(['%s Payload (preview): %s', 'Response', `{"body":"${shortPayload}"}`]);
            }
        );

        it(
            'should verbose log a truncated response payload if it exceeds 1024 characters',
            () => {
                const longPayload = Array(1024).fill("0").join("");

                const response = createResponse({
                    content: { body: longPayload },
                });

                requestLogger.logSuccessfulResponse(response);

                expect(loggerFakes.verbose.mock.calls[0][0]).toBe('%s Payload (preview): %s');
                expect(loggerFakes.verbose.mock.calls[0][1]).toBe('Response');
                const preview = loggerFakes.verbose.mock.calls[0][2];
                expect(preview.endsWith('...')).toBe(true);
                expect(preview.length).toBe(1024 + '...'.length);
            }
        );

        [
            'access_token',
            'refresh_token',
        ].forEach(token => {
            it(`should censor the ${token} token on the response payload`, () => {
                const response = createResponse({
                    content: { [token]: 'SuperSecret' },
                });

                requestLogger.logSuccessfulResponse(response);

                // The censor logic leaves the last 4 characters uncensored
                expect(loggerFakes.verbose.mock.calls[0]).toEqual(['%s Payload (preview): %s', 'Response', `{"${token}":"*******cret"}`]);
            });
        });
    });

    describe('#logErrorResponse', () => {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it(
                'should error log the request url and query params and the error response',
                () => {
                    const request = createRequest({
                        url,
                        qs: {
                            queryKey: "queryVal",
                            "key that has spaces": "value that has spaces",
                        }
                    });
                    const error = {
                        statusCode: 500,
                        errorCode: 4001,
                        message: 'An error message',
                        refId: 123,
                    };

                    requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

                    expect(loggerFakes.log.mock.calls[0]).toEqual(['error', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
                    expect(loggerFakes.error.mock.calls[0]).toEqual(['Response: Failure (HTTP %d)\n\tError Code: %d - %s\n\tRef ID: %s', 500, 4001, 'An error message', 123]);
                }
            );
        });

        it('should not silly log any response headers when none are present', () => {
            const request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            const error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: {},
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            expect(loggerFakes.silly.mock.calls.length).toBe(0);
        });

        it('should silly log the response headers when present', () => {
            const request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            const error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization response header', () => {
            const request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            const error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { authorization: "SuperSecret" }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            // The censor logic leaves the last 4 characters uncensored
            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization response header', () => {
            const request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            const error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { authorization: "" }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            expect(loggerFakes.silly.mock.calls[0]).toEqual(['%s Headers: %s', 'Response', '{"authorization":""}']);
        });
    });

    [
        '',
        'silly',
        'debug',
        'info',
        'warn',
        'error',
        'SuperDuperError'
    ].forEach(level => {
        it('should add formatLog to logger.filters', () => {
            expect(loggerFakes.filters.length).toBe(1);

            const formatLog = loggerFakes.filters[0];
            const fakeDateTime = new Date(0).toISOString();
            const levelDisplay = level.toUpperCase().padStart(7);

            expect(formatLog(level, 'message')).toBe(`${fakeDateTime}[${levelDisplay}] message`);
        });
    });
});
