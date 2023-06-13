var sinon = require('sinon');
const { smartSheetURIs } = require('../../..');
var createRequestLogger = require('../../../lib/utils/requestLogger').create;

describe('#RequestLogger', function () {
    var requestLogger;
    var loggerFakes;
    var clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
        loggerFakes = {
            log: sinon.fake(),
            debug: sinon.fake(),
            verbose: sinon.fake(),
            silly: sinon.fake(),
            info: sinon.fake(),
            warn: sinon.fake(),
            error: sinon.fake(),
            filters: [],
        };
        requestLogger = createRequestLogger(loggerFakes);
    });

    afterEach(() => {
        clock.restore();
    });

    describe('#log', function () {
        it('should call log on the injected logger', () => {
            requestLogger.log("info", "An info message");
            loggerFakes.log.args[0].should.deepEqual(["info", "An info message"]);
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

    describe('#logRequest', function () {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it('should info log the request url and query params', () => {
                var request = createRequest({
                    url,
                    qs: {
                        queryKey: "queryVal",
                        "key that has spaces": "value that has spaces",
                    }
                });
                requestLogger.logRequest(request.verb, request.requestOptions);
                loggerFakes.log.args[0].should.deepEqual(['info', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
            });
        });

        it('should not silly log any request headers when none are present', () => {
            var request = createRequest({
                headers: {}
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.silly.callCount.should.equal(0);
        });

        it('should silly log the request headers when present', () => {
            var request = createRequest({
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Request', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization request header', () => {
            var request = createRequest({
                headers: { authorization: "SuperSecret" }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            // The censor logic leaves the last 4 characters uncensored
            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Request', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization request header', () => {
            var request = createRequest({
                headers: { authorization: "" }
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Request', '{"authorization":""}']);
        });

        it('should not debug nor verbose log any payload if none exists on the request', () => {
            var request = createRequest({
                body: '',
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.debug.callCount.should.equal(0);
            loggerFakes.verbose.callCount.should.equal(0);
        });

        it('should debug log the full request payload', () => {
            var request = createRequest({
                body: 'This is the request payload!',
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.debug.args[0].should.deepEqual(['%s Payload (full): %s', 'Request', 'This is the request payload!']);
        });

        it('should verbose log the full request payload if it does not exceed 1024 characters', () => {
            var shortPayload = Array(1024).fill("0").join("");

            var request = createRequest({
                body: shortPayload,
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.verbose.args[0].should.deepEqual(['%s Payload (preview): %s', 'Request', shortPayload]);
        });

        it('should verbose log a truncated request payload if it exceeds 1024 characters', () => {
            var longPayload = Array(2048).fill("0").join("");

            var request = createRequest({
                body: longPayload,
            });

            requestLogger.logRequest(request.verb, request.requestOptions);

            loggerFakes.verbose.args[0][0].should.equal('%s Payload (preview): %s');
            loggerFakes.verbose.args[0][1].should.equal('Request');
            var preview = loggerFakes.verbose.args[0][2];
            preview.endsWith('...').should.equal(true);
            preview.length.should.equal(1024 + '...'.length);
        });
    });

    describe('#logRetryAttempt', function () {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it('should warn log the attempt and request url and query params', () => {
                var request = createRequest({
                    url,
                    qs: {
                        queryKey: "queryVal",
                        "key that has spaces": "value that has spaces",
                    }
                });
                var error = "some error";
                var attemptNum = 3;

                requestLogger.logRetryAttempt(request.verb, request.requestOptions, error, attemptNum);

                loggerFakes.warn.args[0].should.deepEqual(['Request failed, performing retry #%d\nCause: ', attemptNum, error]);
                loggerFakes.log.args[0].should.deepEqual(['warn', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
            });
        });
    });

    describe('#logRetryFailure', function () {
        it('should error log the failure and attempt number', () => {
            var request = createRequest();
            var attemptNum = 3;

            requestLogger.logRetryFailure(request.verb, request.requestOptions, attemptNum);

            loggerFakes.error.args[0].should.deepEqual(['Request failed after %d retries', attemptNum]);
        });
    });

    describe('#logSuccessfulResponse', function () {
        it('should info log the success and response status code', () => {
            var response = createResponse({
                statusCode: 201,
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.info.args[0].should.deepEqual(['Response: Success (HTTP %d)', 201]);
        });

        it('should not silly log any response headers when none are present', () => {
            var response = createResponse({
                headers: {}
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.silly.callCount.should.equal(0);
        });

        it('should silly log the response headers when present', () => {
            var response = createResponse({
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization response header', () => {
            var response = createResponse({
                headers: { authorization: "SuperSecret" }
            });

            requestLogger.logSuccessfulResponse(response);

            // The censor logic leaves the last 4 characters uncensored
            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization response header', () => {
            var response = createResponse({
                headers: { authorization: "" }
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"authorization":""}']);
        });

        it('should not log an empty response payload', () => {
            var response = createResponse({
                content: {},
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.verbose.callCount.should.equal(0);
            loggerFakes.debug.callCount.should.equal(0);
        });

        it('should debug log the full response payload', () => {
            var response = createResponse({
                content: { body: 'This is the request payload!' },
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.debug.args[0].should.deepEqual(['%s Payload (full): %s', 'Response', '{"body":"This is the request payload!"}']);
        });

        it('should verbose log the full response payload if it does not exceed 1024 characters', () => {
            var shortPayload = Array(512).fill("0").join("");

            var response = createResponse({
                content: { body: shortPayload },
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.verbose.args[0].should.deepEqual(['%s Payload (preview): %s', 'Response', `{"body":"${shortPayload}"}`]);
        });

        it('should verbose log a truncated response payload if it exceeds 1024 characters', () => {
            var longPayload = Array(1024).fill("0").join("");

            var response = createResponse({
                content: { body: longPayload },
            });

            requestLogger.logSuccessfulResponse(response);

            loggerFakes.verbose.args[0][0].should.equal('%s Payload (preview): %s');
            loggerFakes.verbose.args[0][1].should.equal('Response');
            var preview = loggerFakes.verbose.args[0][2];
            preview.endsWith('...').should.equal(true);
            preview.length.should.equal(1024 + '...'.length);
        });

        [
            'access_token',
            'refresh_token',
        ].forEach(token => {
            it(`should censor the ${token} token on the response payload`, () => {
                var response = createResponse({
                    content: { [token]: 'SuperSecret' },
                });

                requestLogger.logSuccessfulResponse(response);

                // The censor logic leaves the last 4 characters uncensored
                loggerFakes.verbose.args[0].should.deepEqual(['%s Payload (preview): %s', 'Response', `{"${token}":"*******cret"}`]);
            });
        });
    });

    describe('#logErrorResponse', function () {
        [
            smartSheetURIs.defaultBaseURI,
            smartSheetURIs.govBaseURI,
            smartSheetURIs.euBaseURI
        ].forEach(url => {
            it('should error log the request url and query params and the error response', () => {
                var request = createRequest({
                    url,
                    qs: {
                        queryKey: "queryVal",
                        "key that has spaces": "value that has spaces",
                    }
                });
                var error = {
                    statusCode: 500,
                    errorCode: 4001,
                    message: 'An error message',
                    refId: 123,
                };

                requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

                loggerFakes.log.args[0].should.deepEqual(['error', '%s %s', request.verb, `${url}?queryKey=queryVal&key%20that%20has%20spaces=value%20that%20has%20spaces`]);
                loggerFakes.error.args[0].should.deepEqual(['Response: Failure (HTTP %d)\n\tError Code: %d - %s\n\tRef ID: %s', 500, 4001, 'An error message', 123]);
            });
        });

        it('should not silly log any response headers when none are present', () => {
            var request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            var error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: {},
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            loggerFakes.silly.callCount.should.equal(0);
        });

        it('should silly log the response headers when present', () => {
            var request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            var error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { someHeader: "someHeaderValue", anotherHeader: 123 }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"someHeader":"someHeaderValue","anotherHeader":123}']);
        });

        it('should censor the authorization response header', () => {
            var request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            var error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { authorization: "SuperSecret" }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            // The censor logic leaves the last 4 characters uncensored
            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"authorization":"*******cret"}']);
        });

        it('should not censor an empty authorization response header', () => {
            var request = createRequest({
                qs: {
                    queryKey: "queryVal",
                    "key that has spaces": "value that has spaces",
                }
            });
            var error = {
                statusCode: 500,
                errorCode: 4001,
                message: 'An error message',
                refId: 123,
                headers: { authorization: "" }
            };

            requestLogger.logErrorResponse(request.verb, request.requestOptions, error);

            loggerFakes.silly.args[0].should.deepEqual(['%s Headers: %s', 'Response', '{"authorization":""}']);
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
            loggerFakes.filters.length.should.equal(1);

            var formatLog = loggerFakes.filters[0];
            var fakeDateTime = new Date(0).toISOString();
            var levelDisplay = level.toUpperCase().padStart(7);

            formatLog(level, 'message').should.equal(`${fakeDateTime}[${levelDisplay}] message`);
        });
    });
});
