import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_REPORT_ID,
    TEST_REPORT_NAME,
    TEST_REPORT_OWNER,
    TEST_REPORT_OWNER_ID,
    TEST_REPORT_PERMALINK,
    TEST_REPORT_ACCESS_LEVEL,
    TEST_REPORT_OWNER_ALL_PROPS,
    TEST_REPORT_OWNER_ID_ALL_PROPS,
    TEST_REPORT_ACCESS_LEVEL_ALL_PROPS,
    TEST_REPORT_PERMALINK_ALL_PROPS,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    TEST_MODIFIED_AT_ALL_PROPS,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Reports - getReport endpoint tests', () => {
    const client = createClient();

    it('getReport generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report/required-response-body-properties'
            }
        };
        await client.reports.getReport(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}`);
    });

    it('getReport all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report/all-response-body-properties'
            }
        };
        const response = await client.reports.getReport(options);
        
        expect(response).toEqual({
            id: TEST_REPORT_ID,
            name: TEST_REPORT_NAME,
            accessLevel: TEST_REPORT_ACCESS_LEVEL_ALL_PROPS,
            permalink: TEST_REPORT_PERMALINK_ALL_PROPS,
            createdAt: TEST_CREATED_AT,
            modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
            isSummaryReport: false,
            readOnly: false,
            favorite: true,
            owner: TEST_REPORT_OWNER_ALL_PROPS,
            ownerId: TEST_REPORT_OWNER_ID_ALL_PROPS,
            fromId: 9876543210,
            totalRowCount: 150,
            version: 5,
            cellImageUploadEnabled: true,
            dependenciesEnabled: false,
            ganttEnabled: false,
            hasSummaryFields: true,
            isMultiPicklistEnabled: true,
            resourceManagementEnabled: false,
            resourceManagementType: 'NONE',
            showParentRowsForFilters: true,
            effectiveAttachmentOptions: ['FILE', 'LINK'],
            scope: {
                sheets: [{
                    id: 1001,
                    name: 'Source Sheet',
                    accessLevel: 'ADMIN',
                    permalink: 'https://app.smartsheet.com/sheets/source',
                    fromId: 1000,
                    ownerId: 9876543210,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                    version: 1,
                    favorite: true,
                    readOnly: false,
                    cellImageUploadEnabled: true,
                    dependenciesEnabled: false,
                    ganttEnabled: false,
                    hasSummaryFields: true,
                    isMultiPicklistEnabled: true,
                    resourceManagementEnabled: false,
                    resourceManagementType: 'NONE',
                    showParentRowsForFilters: true,
                    totalRowCount: 50,
                    owner: TEST_REPORT_OWNER_ALL_PROPS,
                    effectiveAttachmentOptions: ['FILE'],
                    attachments: [{
                        id: 2001,
                        parentId: 1001,
                        name: 'attachment.pdf',
                        attachmentType: 'FILE',
                        attachmentSubType: 'DOCUMENT',
                        mimeType: 'application/pdf',
                        parentType: 'SHEET',
                        createdAt: TEST_CREATED_AT,
                        createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                        sizeInKb: 1024,
                        url: 'https://example.com/attachment.pdf',
                        urlExpiresInMillis: 1609459200000
                    }],
                    columns: [{
                        id: 7001,
                        index: 0,
                        title: 'Task Name',
                        type: 'TEXT_NUMBER',
                        primary: true,
                        width: 150,
                        locked: false,
                        lockedForUser: false,
                        validation: true,
                        version: 1,
                        hidden: false,
                        symbol: 'STAR',
                        description: 'Task column',
                        format: ',,1,1,,,,,,,,,,,,,',
                        formula: '',
                        systemColumnType: 'AUTO_NUMBER',
                        autoNumberFormat: {
                            fill: '0001',
                            prefix: 'TASK-',
                            startingNumber: 1,
                            suffix: ''
                        },
                        options: ['Option1', 'Option2'],
                        tags: ['CALENDAR_START_DATE'],
                        contactOptions: [{
                            email: 'contact@example.com',
                            name: 'Contact Name'
                        }]
                    }],
                    rows: [{
                        id: 8001,
                        rowNumber: 1,
                        sheetId: 1001,
                        siblingId: 8002,
                        accessLevel: 'ADMIN',
                        expanded: true,
                        filteredOut: false,
                        inCriticalPath: false,
                        locked: false,
                        lockedForUser: false,
                        createdAt: TEST_CREATED_AT,
                        modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                        version: 1,
                        format: ',,1,1,,,,,,,,,,,,,',
                        conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                        permaLink: 'https://app.smartsheet.com/sheets/row/8001',
                        createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                        modifiedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                        cells: [{
                            columnId: 7001,
                            rowId: 8001,
                            columnType: 'TEXT_NUMBER',
                            value: 'Task 1',
                            displayValue: 'Task 1',
                            format: ',,1,1,,,,,,,,,,,,,',
                            conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                            formula: '',
                            strict: false,
                            overrideValidation: false,
                            hyperlink: {
                                url: 'https://example.com',
                                reportId: 0,
                                sheetId: 0,
                                sightId: 0
                            },
                            image: {
                                id: 'img123',
                                altText: 'Image',
                                height: 100,
                                width: 100
                            },
                            linkInFromCell: {
                                columnId: 7001,
                                rowId: 8001,
                                sheetId: 1001,
                                sheetName: 'Source',
                                status: 'OK'
                            },
                            linksOutToCells: [{
                                columnId: 7002,
                                rowId: 8002,
                                sheetId: 1002,
                                sheetName: 'Target',
                                status: 'OK'
                            }],
                            objectValue: {
                                objectType: 'DATE',
                                value: '2025-03-03'
                            }
                        }],
                        columns: [],
                        attachments: [],
                        discussions: [],
                        proof: {
                            id: 9001,
                            originalId: 9000,
                            name: 'Proof',
                            type: 'DOCUMENT',
                            documentType: 'PDF',
                            proofRequestUrl: 'https://example.com/proof',
                            version: 1,
                            lastUpdatedAt: TEST_CREATED_AT,
                            lastUpdatedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                            isCompleted: true,
                            attachments: [],
                            discussions: []
                        }
                    }],
                    discussions: [{
                        id: 5001,
                        title: 'Discussion',
                        commentCount: 1,
                        accessLevel: 'ADMIN',
                        parentId: 8001,
                        parentType: 'ROW',
                        readOnly: false,
                        lastCommentedAt: TEST_CREATED_AT,
                        createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                        lastCommentedUser: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                        comments: [{
                            id: 6001,
                            discussionId: 5001,
                            text: 'Comment text',
                            createdAt: TEST_CREATED_AT,
                            modifiedAt: TEST_CREATED_AT,
                            createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                            attachments: []
                        }],
                        commentAttachments: []
                    }],
                    crossSheetReferences: [{
                        id: 3001,
                        name: 'Cross Ref',
                        startColumnId: 7001,
                        endColumnId: 7002,
                        startRowId: 8001,
                        endRowId: 8002,
                        sourceSheetId: 1001,
                        status: 'OK'
                    }],
                    projectSettings: {
                        workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
                        nonWorkingDays: ['2019-12-25'],
                        lengthOfDay: 8
                    },
                    userSettings: {
                        criticalPathEnabled: false,
                        displaySummaryTasks: true
                    },
                    userPermissions: {
                        summaryPermissions: 'ADMIN'
                    },
                    source: {
                        id: 1001,
                        type: 'sheet'
                    },
                    summary: {
                        fields: [{
                            id: 10001,
                            title: 'Summary Field',
                            type: 'TEXT_NUMBER',
                            index: 0,
                            locked: false,
                            lockedForUser: false,
                            validation: true,
                            displayValue: 'Value',
                            format: ',,1,1,,,,,,,,,,,,,',
                            formula: '=SUM([Col1]:[Col2])',
                            symbol: 'STAR',
                            createdAt: TEST_CREATED_AT,
                            modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                            createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                            modifiedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                            hyperlink: {
                                url: 'https://example.com',
                                reportId: 0,
                                sheetId: 0,
                                sightId: 0
                            },
                            image: {
                                id: 'sumimg123',
                                altText: 'Summary Image',
                                height: 50,
                                width: 50
                            },
                            objectValue: {
                                objectType: 'NUMBER',
                                value: '100'
                            },
                            options: ['Opt1'],
                            contactOptions: []
                        }]
                    },
                    workspace: {
                        id: 2001,
                        name: 'Workspace',
                        accessLevel: 'ADMIN',
                        permalink: 'https://app.smartsheet.com/workspaces/test'
                    }
                }],
                workspaces: [{
                    id: 2001,
                    name: 'Workspace',
                    accessLevel: 'ADMIN',
                    permalink: 'https://app.smartsheet.com/workspaces/test'
                }]
            },
            sourceSheets: [{
                id: 1001,
                name: 'Source Sheet',
                accessLevel: 'ADMIN',
                permalink: 'https://app.smartsheet.com/sheets/source',
                fromId: 1000,
                ownerId: 9876543210,
                createdAt: TEST_CREATED_AT,
                modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                version: 1,
                favorite: true,
                readOnly: false,
                cellImageUploadEnabled: true,
                dependenciesEnabled: false,
                ganttEnabled: false,
                hasSummaryFields: true,
                isMultiPicklistEnabled: true,
                resourceManagementEnabled: false,
                resourceManagementType: 'NONE',
                showParentRowsForFilters: true,
                totalRowCount: 50,
                owner: TEST_REPORT_OWNER_ALL_PROPS,
                effectiveAttachmentOptions: ['FILE'],
                attachments: [],
                columns: [],
                rows: [],
                discussions: [],
                crossSheetReferences: [],
                projectSettings: {
                    workingDays: ['MONDAY'],
                    nonWorkingDays: ['2019-12-25'],
                    lengthOfDay: 8
                },
                userSettings: {
                    criticalPathEnabled: false,
                    displaySummaryTasks: true
                },
                userPermissions: {
                    summaryPermissions: 'ADMIN'
                },
                source: {
                    id: 1001,
                    type: 'sheet'
                },
                summary: {
                    fields: []
                },
                workspace: {
                    id: 2001,
                    name: 'Workspace',
                    accessLevel: 'ADMIN',
                    permalink: 'https://app.smartsheet.com/workspaces/test'
                }
            }],
            columns: [{
                id: 7001,
                index: 0,
                title: 'Task Name',
                type: 'TEXT_NUMBER',
                primary: true,
                width: 150,
                locked: false,
                lockedForUser: false,
                validation: true,
                version: 1,
                hidden: false,
                symbol: 'STAR',
                description: 'Task column',
                format: ',,1,1,,,,,,,,,,,,,',
                formula: '',
                systemColumnType: 'AUTO_NUMBER',
                autoNumberFormat: {
                    fill: '0001',
                    prefix: 'TASK-',
                    startingNumber: 1,
                    suffix: ''
                },
                options: ['Option1'],
                tags: ['CALENDAR_START_DATE'],
                contactOptions: [{
                    email: 'contact@example.com',
                    name: 'Contact Name'
                }]
            }],
            rows: [{
                id: 8001,
                rowNumber: 1,
                sheetId: TEST_REPORT_ID,
                siblingId: 8002,
                accessLevel: 'ADMIN',
                expanded: true,
                filteredOut: false,
                inCriticalPath: false,
                locked: false,
                lockedForUser: false,
                createdAt: TEST_CREATED_AT,
                modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                version: 1,
                format: ',,1,1,,,,,,,,,,,,,',
                conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                permaLink: 'https://app.smartsheet.com/sheets/row/8001',
                createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                modifiedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                cells: [{
                    columnId: 7001,
                    rowId: 8001,
                    columnType: 'TEXT_NUMBER',
                    value: 'Task 1',
                    displayValue: 'Task 1',
                    format: ',,1,1,,,,,,,,,,,,,',
                    conditionalFormat: ',,1,1,,,,,,,,,,,,,',
                    formula: '',
                    strict: false,
                    overrideValidation: false,
                    hyperlink: {
                        url: 'https://example.com',
                        reportId: 0,
                        sheetId: 0,
                        sightId: 0
                    },
                    image: {
                        id: 'img123',
                        altText: 'Image',
                        height: 100,
                        width: 100
                    },
                    linkInFromCell: {
                        columnId: 7001,
                        rowId: 8001,
                        sheetId: 1001,
                        sheetName: 'Source',
                        status: 'OK'
                    },
                    linksOutToCells: [{
                        columnId: 7002,
                        rowId: 8002,
                        sheetId: 1002,
                        sheetName: 'Target',
                        status: 'OK'
                    }],
                    objectValue: {
                        objectType: 'DATE',
                        value: '2025-03-03'
                    }
                }],
                columns: [],
                attachments: [],
                discussions: [],
                proof: {
                    id: 9001,
                    originalId: 9000,
                    name: 'Proof',
                    type: 'DOCUMENT',
                    documentType: 'PDF',
                    proofRequestUrl: 'https://example.com/proof',
                    version: 1,
                    lastUpdatedAt: TEST_CREATED_AT,
                    lastUpdatedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                    isCompleted: true,
                    attachments: [],
                    discussions: []
                }
            }],
            attachments: [{
                id: 2001,
                parentId: TEST_REPORT_ID,
                name: 'attachment.pdf',
                attachmentType: 'FILE',
                attachmentSubType: 'DOCUMENT',
                mimeType: 'application/pdf',
                parentType: 'REPORT',
                createdAt: TEST_CREATED_AT,
                createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                sizeInKb: 1024,
                url: 'https://example.com/attachment.pdf',
                urlExpiresInMillis: 1609459200000
            }],
            discussions: [{
                id: 5001,
                title: 'Discussion',
                commentCount: 1,
                accessLevel: 'ADMIN',
                parentId: 8001,
                parentType: 'ROW',
                readOnly: false,
                lastCommentedAt: TEST_CREATED_AT,
                createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                lastCommentedUser: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                comments: [{
                    id: 6001,
                    discussionId: 5001,
                    text: 'Comment text',
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_CREATED_AT,
                    createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                    attachments: []
                }],
                commentAttachments: []
            }],
            crossSheetReferences: [{
                id: 3001,
                name: 'Cross Ref',
                startColumnId: 7001,
                endColumnId: 7002,
                startRowId: 8001,
                endRowId: 8002,
                sourceSheetId: 1001,
                status: 'OK'
            }],
            workspace: {
                id: 2001,
                name: 'Workspace',
                accessLevel: 'ADMIN',
                permalink: 'https://app.smartsheet.com/workspaces/test'
            },
            projectSettings: {
                workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
                nonWorkingDays: ['2019-12-25'],
                lengthOfDay: 8
            },
            userSettings: {
                criticalPathEnabled: false,
                displaySummaryTasks: true
            },
            userPermissions: {
                summaryPermissions: 'ADMIN'
            },
            source: {
                id: TEST_REPORT_ID,
                type: 'report'
            },
            summary: {
                fields: [{
                    id: 10001,
                    title: 'Summary Field',
                    type: 'TEXT_NUMBER',
                    index: 0,
                    locked: false,
                    lockedForUser: false,
                    validation: true,
                    displayValue: 'Value',
                    format: ',,1,1,,,,,,,,,,,,,',
                    formula: '=SUM([Col1]:[Col2])',
                    symbol: 'STAR',
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT_ALL_PROPS,
                    createdBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                    modifiedBy: { email: 'jane.doe@smartsheet.com', name: 'Jane Doe' },
                    hyperlink: {
                        url: 'https://example.com',
                        reportId: 0,
                        sheetId: 0,
                        sightId: 0
                    },
                    image: {
                        id: 'sumimg123',
                        altText: 'Summary Image',
                        height: 50,
                        width: 50
                    },
                    objectValue: {
                        objectType: 'NUMBER',
                        value: '100'
                    },
                    options: ['Opt1'],
                    contactOptions: []
                }]
            }
        });
    });

    it('getReport required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report/required-response-body-properties'
            }
        };
        const response = await client.reports.getReport(options);
        
        expect(response).toEqual({
            scope: {
                sheets: [],
                workspaces: []
            },
            isSummaryReport: false,
            id: TEST_REPORT_ID,
            fromId: 0,
            ownerId: TEST_REPORT_OWNER_ID,
            accessLevel: TEST_REPORT_ACCESS_LEVEL,
            cellImageUploadEnabled: false,
            columns: [],
            createdAt: TEST_CREATED_AT,
            dependenciesEnabled: false,
            effectiveAttachmentOptions: [],
            ganttEnabled: false,
            hasSummaryFields: false,
            isMultiPicklistEnabled: false,
            modifiedAt: TEST_MODIFIED_AT,
            name: TEST_REPORT_NAME,
            owner: TEST_REPORT_OWNER,
            permalink: TEST_REPORT_PERMALINK,
            projectSettings: {
                lengthOfDay: 8,
                nonWorkingDays: [],
                workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
            },
            readOnly: false,
            resourceManagementEnabled: false,
            resourceManagementType: 'NONE',
            rows: [],
            showParentRowsForFilters: false,
            source: { id: 0, type: 'sheet' },
            summary: { fields: [] },
            totalRowCount: 0,
            userPermissions: { summaryPermissions: 'VIEWER' },
            userSettings: { criticalPathEnabled: false, displaySummaryTasks: false },
            version: 1,
            workspace: {
                id: 0,
                name: 'Test Workspace',
                accessLevel: 'VIEWER',
                permalink: 'https://app.smartsheet.com/workspaces/test'
            }
        });
    });

    it('getReport error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.getReport(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getReport error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.getReport(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
