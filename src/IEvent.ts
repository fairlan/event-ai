export interface IEvent<T> {
    on(callback: (data: T) => void): () => void;
    once(callback: (data: T) => void): () => void;
    off(callback: (data: T) => void): void;
    fire(data: T): void;
}

export type EventCallback<T> = (data: T) => void;

export interface Listener<T> {
    type: 'once' | 'on';
    callback: EventCallback<T>;
} 