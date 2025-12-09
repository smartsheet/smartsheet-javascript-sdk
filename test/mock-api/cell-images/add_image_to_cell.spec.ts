import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_ROW_ID,
    TEST_COLUMN_ID,
    TEST_VERSION,
    TEST_MESSAGE,
    TEST_RESULT_CODE,
    TEST_ROW_NUMBER,
    TEST_ACCESS_LEVEL,
    TEST_USER_EMAIL,
    TEST_USER_NAME,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    TEST_CELL_IMAGE_ALT_TEXT,
    TEST_CELL_IMAGE_HEIGHT,
    TEST_CELL_IMAGE_WIDTH,
    TEST_CELL_IMAGE_ID,
    TEST_ATTACHMENT_ID,
    TEST_ATTACHMENT_NAME,
    TEST_ATTACHMENT_SIZE_KB,
    TEST_ATTACHMENT_URL,
    TEST_ATTACHMENT_MIME_TYPE,
    TEST_URL_EXPIRES_IN_MILLIS,
    TEST_SIBLING_ID,
    TEST_FAILED_ROW_ID,
    TEST_FAILED_ERROR_REF_ID,
    TEST_FAILED_ERROR_CODE,
    TEST_FAILED_ERROR_MESSAGE,
    TEST_FAILED_INDEX,
    TEST_OVERRIDE_VALIDATION,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Images - addImageToCell endpoint tests', () => {
    const client = createClient();
    const testImageBuffer = Buffer.from('fake-image-data');

    it('addImageToCell generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            rowId: TEST_ROW_ID,
            columnId: TEST_COLUMN_ID,
            body: testImageBuffer,
            queryParameters: {
                altText: TEST_CELL_IMAGE_ALT_TEXT,
                overrideValidation: TEST_OVERRIDE_VALIDATION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/cell-images/add-image-to-cell/all-response-body-properties'
            }
        };
        await client.images.addImageToCell(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/sheets/${TEST_SHEET_ID}/rows/${TEST_ROW_ID}/columns/${TEST_COLUMN_ID}/cellimages`);

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            altText: TEST_CELL_IMAGE_ALT_TEXT,
            overrideValidation: TEST_OVERRIDE_VALIDATION.toString()
        });
    });

    it('addImageToCell all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            rowId: TEST_ROW_ID,
            columnId: TEST_COLUMN_ID,
            body: testImageBuffer,
            queryParameters: {
                altText: TEST_CELL_IMAGE_ALT_TEXT,
                overrideValidation: TEST_OVERRIDE_VALIDATION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/cell-images/add-image-to-cell/all-response-body-properties'
            }
        };
        const response = await client.images.addImageToCell(options);
        const matchedRequest = await findWireMockRequest(requestId);

        // Verify request body
        expect(matchedRequest.body).toEqual(testImageBuffer.toString());

        expect(response).toEqual({
            version: TEST_VERSION,
            failedItems: [
                {
                    rowId: TEST_FAILED_ROW_ID,
                    error: {
                        refId: TEST_FAILED_ERROR_REF_ID,
                        errorCode: TEST_FAILED_ERROR_CODE,
                        message: TEST_FAILED_ERROR_MESSAGE
                    },
                    index: TEST_FAILED_INDEX
                }
            ],
            message: TEST_MESSAGE,
            resultCode: TEST_RESULT_CODE,
            result: {
                id: TEST_ROW_ID,
                sheetId: TEST_SHEET_ID,
                siblingId: TEST_SIBLING_ID,
                accessLevel: TEST_ACCESS_LEVEL,
                attachments: [
                    {
                        id: TEST_ATTACHMENT_ID,
                        parentId: TEST_ROW_ID,
                        attachmentType: 'FILE',
                        attachmentSubType: 'DOCUMENT',
                        mimeType: TEST_ATTACHMENT_MIME_TYPE,
                        parentType: 'ROW',
                        createdAt: TEST_CREATED_AT,
                        createdBy: {
                            email: TEST_USER_EMAIL,
                            name: TEST_USER_NAME
                        },
                        name: TEST_ATTACHMENT_NAME,
                        sizeInKb: TEST_ATTACHMENT_SIZE_KB,
                        url: TEST_ATTACHMENT_URL,
                        urlExpiresInMillis: TEST_URL_EXPIRES_IN_MILLIS
                    }
                ],
                cells: [
                    {
                        columnId: TEST_COLUMN_ID,
                        columnType: 'TEXT_NUMBER',
                        conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                        displayValue: 'Sample Cell Value',
                        format: ',,1,1,,,,,,,,,,,,,',
                        formula: '=SUM(A1:A10)',
                        hyperlink: {
                            reportId: 4444444444444444,
                            sheetId: TEST_SHEET_ID,
                            sightId: 5555555555555555,
                            url: 'https://example.com'
                        },
                        image: {
                            altText: TEST_CELL_IMAGE_ALT_TEXT,
                            height: TEST_CELL_IMAGE_HEIGHT,
                            id: TEST_CELL_IMAGE_ID,
                            width: TEST_CELL_IMAGE_WIDTH
                        },
                        linkInFromCell: {
                            columnId: 6666666666666666,
                            rowId: 7777777777777777,
                            sheetId: 8888888888888888,
                            sheetName: 'Source Sheet',
                            status: 'OK'
                        },
                        linksOutToCells: [
                            {
                                columnId: 9999999999999998,
                                rowId: 1010101010101010,
                                sheetId: 1212121212121212,
                                sheetName: 'Target Sheet',
                                status: 'OK'
                            }
                        ],
                        objectValue: {
                            objectType: 'ABSTRACT_DATETIME',
                            value: '2025-03-03T16:59:59'
                        },
                        overrideValidation: true,
                        strict: true,
                        value: 'Sample Value'
                    }
                ],
                columns: [
                    {
                        autoNumberFormat: {
                            fill: '0000',
                            prefix: 'ID-',
                            startingNumber: 1,
                            suffix: '-END'
                        },
                        contactOptions: [
                            {
                                email: 'contact@example.com',
                                name: 'Contact Name'
                            }
                        ],
                        description: 'Column description',
                        format: ',,1,1,,,,,,,,,,,,,',
                        formula: '=A1+B1',
                        hidden: false,
                        id: TEST_COLUMN_ID,
                        index: 0,
                        locked: false,
                        lockedForUser: false,
                        options: [
                            'Option 1',
                            'Option 2'
                        ],
                        primary: true,
                        symbol: 'STAR',
                        systemColumnType: 'AUTO_NUMBER',
                        tags: [
                            'CALENDAR_START_DATE'
                        ],
                        title: 'Primary Column',
                        type: 'TEXT_NUMBER',
                        validation: true,
                        version: TEST_VERSION,
                        width: 150
                    }
                ],
                conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                createdAt: TEST_CREATED_AT,
                createdBy: {
                    email: TEST_USER_EMAIL,
                    name: TEST_USER_NAME
                },
                discussions: [
                    {
                        accessLevel: TEST_ACCESS_LEVEL,
                        id: 1313131313131313,
                        comments: [
                            {
                                attachments: [
                                    {
                                        id: 1414141414141414,
                                        parentId: 1515151515151515,
                                        attachmentType: 'FILE',
                                        attachmentSubType: 'DOCUMENT',
                                        mimeType: 'application/pdf',
                                        parentType: 'COMMENT',
                                        createdAt: TEST_CREATED_AT,
                                        createdBy: {
                                            email: TEST_USER_EMAIL,
                                            name: TEST_USER_NAME
                                        },
                                        name: 'document.pdf',
                                        sizeInKb: 250,
                                        url: 'https://example.com/document.pdf',
                                        urlExpiresInMillis: TEST_URL_EXPIRES_IN_MILLIS
                                    }
                                ],
                                createdAt: TEST_CREATED_AT,
                                createdBy: {
                                    email: TEST_USER_EMAIL,
                                    name: TEST_USER_NAME
                                },
                                discussionId: 1313131313131313,
                                id: 1515151515151515,
                                modifiedAt: TEST_MODIFIED_AT,
                                text: 'This is a comment'
                            }
                        ],
                        commentAttachments: [
                            {
                                id: 1414141414141414,
                                parentId: 1515151515151515,
                                attachmentType: 'FILE',
                                attachmentSubType: 'DOCUMENT',
                                mimeType: 'application/pdf',
                                parentType: 'COMMENT',
                                createdAt: TEST_CREATED_AT,
                                createdBy: {
                                    email: TEST_USER_EMAIL,
                                    name: TEST_USER_NAME
                                },
                                name: 'document.pdf',
                                sizeInKb: 250,
                                url: 'https://example.com/document.pdf',
                                urlExpiresInMillis: TEST_URL_EXPIRES_IN_MILLIS
                            }
                        ],
                        commentCount: 1,
                        createdBy: {
                            email: TEST_USER_EMAIL,
                            name: TEST_USER_NAME
                        },
                        lastCommentedAt: TEST_CREATED_AT,
                        lastCommentedUser: {
                            email: TEST_USER_EMAIL,
                            name: TEST_USER_NAME
                        },
                        parentId: TEST_ROW_ID,
                        parentType: 'ROW',
                        readOnly: false,
                        title: 'Discussion Title'
                    }
                ],
                proof: {
                    id: 1616161616161616,
                    originalId: 1717171717171717,
                    name: 'Proof Document',
                    type: 'DOCUMENT',
                    documentType: 'PDF',
                    proofRequestUrl: 'https://example.com/proof',
                    version: TEST_VERSION,
                    lastUpdatedAt: TEST_CREATED_AT,
                    lastUpdatedBy: {
                        email: TEST_USER_EMAIL,
                        name: TEST_USER_NAME
                    },
                    isCompleted: true,
                    attachments: [
                        {
                            id: 1818181818181818,
                            parentId: 1616161616161616,
                            attachmentType: 'FILE',
                            attachmentSubType: 'DOCUMENT',
                            mimeType: 'application/pdf',
                            parentType: 'PROOF',
                            createdAt: TEST_CREATED_AT,
                            createdBy: {
                                email: TEST_USER_EMAIL,
                                name: TEST_USER_NAME
                            },
                            name: 'proof.pdf',
                            sizeInKb: 500,
                            url: 'https://example.com/proof.pdf',
                            urlExpiresInMillis: TEST_URL_EXPIRES_IN_MILLIS
                        }
                    ],
                    discussions: [
                        {
                            accessLevel: TEST_ACCESS_LEVEL,
                            id: 1919191919191919,
                            comments: [
                                {
                                    attachments: [],
                                    createdAt: TEST_CREATED_AT,
                                    createdBy: {
                                        email: TEST_USER_EMAIL,
                                        name: TEST_USER_NAME
                                    },
                                    discussionId: 1919191919191919,
                                    id: 2020202020202020,
                                    modifiedAt: TEST_MODIFIED_AT,
                                    text: 'Proof comment'
                                }
                            ],
                            commentAttachments: [],
                            commentCount: 1,
                            createdBy: {
                                email: TEST_USER_EMAIL,
                                name: TEST_USER_NAME
                            },
                            lastCommentedAt: TEST_CREATED_AT,
                            lastCommentedUser: {
                                email: TEST_USER_EMAIL,
                                name: TEST_USER_NAME
                            },
                            parentId: 1616161616161616,
                            parentType: 'PROOF',
                            readOnly: false,
                            title: 'Proof Discussion'
                        }
                    ]
                },
                expanded: true,
                filteredOut: false,
                format: ',,1,1,,,,,,,,,,,,,',
                inCriticalPath: false,
                locked: false,
                lockedForUser: false,
                modifiedAt: TEST_MODIFIED_AT,
                modifiedBy: {
                    email: TEST_USER_EMAIL,
                    name: TEST_USER_NAME
                },
                permaLink: 'https://app.smartsheet.com/sheets/123456789',
                rowNumber: TEST_ROW_NUMBER,
                version: TEST_VERSION
            }
        });
    });

    it('addImageToCell required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            rowId: TEST_ROW_ID,
            columnId: TEST_COLUMN_ID,
            body: testImageBuffer,
            queryParameters: {
                altText: TEST_CELL_IMAGE_ALT_TEXT,
                overrideValidation: TEST_OVERRIDE_VALIDATION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/cell-images/add-image-to-cell/required-response-body-properties'
            }
        };
        const response = await client.images.addImageToCell(options);

        expect(response).toEqual({
            message: TEST_MESSAGE,
            resultCode: TEST_RESULT_CODE,
            version: TEST_VERSION,
            result: {
                id: TEST_ROW_ID,
                sheetId: TEST_SHEET_ID,
                rowNumber: TEST_ROW_NUMBER,
                expanded: true,
                createdAt: TEST_CREATED_AT,
                modifiedAt: TEST_MODIFIED_AT,
                cells: []
            }
        });
    });

    it('addImageToCell error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            rowId: TEST_ROW_ID,
            columnId: TEST_COLUMN_ID,
            body: testImageBuffer,
            queryParameters: {
                altText: TEST_CELL_IMAGE_ALT_TEXT
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.images.addImageToCell(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addImageToCell error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            rowId: TEST_ROW_ID,
            columnId: TEST_COLUMN_ID,
            body: testImageBuffer,
            queryParameters: {
                altText: TEST_CELL_IMAGE_ALT_TEXT
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.images.addImageToCell(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
