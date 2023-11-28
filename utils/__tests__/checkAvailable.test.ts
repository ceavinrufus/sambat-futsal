import { checkAvailable } from '../checkAvailable';
import { FieldSchedule } from '@/types/FieldSchedule';

describe('checkAvailable function', () => {
    const schedules: FieldSchedule[] = [
        { field_id: '1', date: new Date(), time: '10:00', available: true },
        { field_id: '2', date: new Date(), time: '11:00', available: false },
        { field_id: '3', date: new Date(), time: '12:00', available: true },
    ];

    it('should return true for available time', () => {
        const result = checkAvailable(schedules, '10:00');
        expect(result).toBe(true);
    });

    it('should return false for unavailable time', () => {
        const result = checkAvailable(schedules, '11:00');
        expect(result).toBe(false);
    });

    it('should return true for time not in schedules', () => {
        const result = checkAvailable(schedules, '09:00');
        expect(result).toBe(true);
    });
});
