import {Frequency} from '../models/frequency.model';

export function mapFrequencyToFrequencyDto(frequency: Frequency) {
    return {
        counter: frequency.counter
    };
}