import { Event } from '../src';
import { describe, expect, test, jest, beforeEach } from '@jest/globals';

describe('Event', () => {
    let event: Event<string>;
    
    beforeEach(() => {
        event = new Event<string>();
    });

    test('on should add listener', () => {
        const callback = jest.fn();
        event.on(callback);
        event.fire('test');
        expect(callback).toHaveBeenCalledWith('test');
    });

    test('once should only trigger once', () => {
        const callback = jest.fn();
        event.once(callback);
        
        event.fire('first');
        event.fire('second');
        
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('first');
    });

    test('off should remove listener', () => {
        const callback = jest.fn();
        event.on(callback);
        event.off(callback);
        event.fire('test');
        expect(callback).not.toHaveBeenCalled();
    });

    test('on should return unsubscribe function', () => {
        const callback = jest.fn();
        const unsubscribe = event.on(callback);
        
        event.fire('first');
        unsubscribe();
        event.fire('second');
        
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('first');
    });

    test('once should return unsubscribe function', () => {
        const callback = jest.fn();
        const unsubscribe = event.once(callback);
        
        unsubscribe();
        event.fire('test');
        
        expect(callback).not.toHaveBeenCalled();
    });

    test('removeAllListeners should remove all listeners', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        
        event.on(callback1);
        event.once(callback2);
        
        event.removeAllListeners();
        event.fire('test');
        
        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });

    test('multiple listeners should all be called', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const callback3 = jest.fn();
        
        event.on(callback1);
        event.on(callback2);
        event.once(callback3);
        
        event.fire('test');
        
        expect(callback1).toHaveBeenCalledWith('test');
        expect(callback2).toHaveBeenCalledWith('test');
        expect(callback3).toHaveBeenCalledWith('test');
    });
}); 