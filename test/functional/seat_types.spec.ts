import { expect, describe, it } from '@jest/globals';
import { SeatTypes } from '@smartsheet/users/types';

describe('SeatTypes', () => {
    it('lists the seat types the API returns', () => {
        expect(Object.values(SeatTypes)).toEqual(['MEMBER', 'PROVISIONAL_MEMBER', 'GUEST', 'CONTRIBUTOR']);
    });
});
