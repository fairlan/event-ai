import { IEvent, EventCallback, Listener } from './IEvent';

export class Event<T = any> implements IEvent<T> {
    protected listeners: Listener<T>[] = [];

    public on(callback: EventCallback<T>): () => void {
        this.listeners.push({ type: 'on', callback });
        return () => this.off(callback);
    }

    public once(callback: EventCallback<T>): () => void {
        this.listeners.push({ type: 'once', callback });
        return () => this.off(callback);
    }
    
    public off(callback: EventCallback<T>): void {
        this.listeners = this.listeners.filter(listener => listener.callback !== callback);
    }

    public fire(data: T): void {
        const currentListeners = [...this.listeners];
        this.listeners = this.listeners.filter(listener => listener.type !== 'once');
        
        currentListeners.forEach(({ callback }) => {
            callback(data);
        });
    }

    public removeAllListeners(): void {
        this.listeners = [];
    }
} 