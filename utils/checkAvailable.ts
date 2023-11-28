import { FieldSchedule } from '@/types/FieldSchedule';

export const checkAvailable = (schedules: FieldSchedule[], time: string) => {
    const filterTime = schedules.find(
        (schedule) => schedule.time === time
    );
    if (filterTime) {
        return filterTime.available;
    } else {
        return true;
    }
}