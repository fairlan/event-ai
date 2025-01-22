# events


A type-safe event management system for TypeScript/JavaScript projects. Unlike traditional event emitters that use string-based event names, events provides a strongly-typed event system where each event is an instance with its own type definition.

## Overview

This repository provides a streamlined and reusable event management system designed to enhance code readability and maintainability. By centralizing event definitions, developers can easily track, manage, and reuse events across different components of an application.

## Features

### Type Safety
- 🎯 **Type-Safe Events**: Each event instance has its own type definition
- 🔍 **Compile-time Checking**: Catch event data errors during development
- 💪 **TypeScript First**: Full type inference and autocompletion

### Developer Experience
- 📦 **Zero Dependencies**: Lightweight and minimal
- 🧹 **Auto Cleanup**: Returns unsubscribe function for easy cleanup
- 🔍 **Easy Debugging**: Clear event flow and type information

### Event Management
- 📝 **Centralized Definitions**: Define all events in one place
- 🔄 **Reusable Instances**: Share events across components
- 🎯 **Easy Tracking**: Quickly locate event usage

## API

### `Event<T>`

#### Methods

- `on(callback: (data: T) => void): () => void`
  - Adds an event listener
  - Returns an unsubscribe function

- `once(callback: (data: T) => void): () => void`
  - Adds a one-time event listener
  - Returns an unsubscribe function

- `off(callback: (data: T) => void): void`
  - Removes a specific listener

- `fire(data: T): void`
  - Triggers the event with data

- `removeAllListeners(): void`
  - Removes all event listeners

## Best Practices

1. **Type-Safe Event Definitions**
   ```typescript
   // events/index.ts
   interface LoginEventData {
       userId: string;
       timestamp: Date;
   }

   // Type-safe event instance
   export const userLoginEvent = new Event<LoginEventData>();
   // TypeScript will ensure correct data structure
   userLoginEvent.fire({ userId: '123', timestamp: new Date() });
   // Error: userLoginEvent.fire({ userId: '123' }); // missing timestamp
   ```

2. **Centralize Event Definitions**
   ```typescript
   // events/index.ts
   export const userLoginEvent = new Event<LoginEventData>();
   export const userLogoutEvent = new Event<LogoutEventData>();
   ```

3. **React Integration**
   ```typescript
   // LoginButton.tsx
   import { userLoginEvent } from './events';

   function LoginButton() {
       const handleLogin = async () => {
           // 处理登录逻辑...
           userLoginEvent.fire({
               userId: 'user123',
               timestamp: new Date()
           });
       };

       return <button onClick={handleLogin}>Login</button>;
   }

   // UserProfile.tsx
   import { useEffect, useState } from 'react';
   import { userLoginEvent } from './events';

   function UserProfile() {
       const [userId, setUserId] = useState<string | null>(null);

       useEffect(() => {
           const unsubscribe = userLoginEvent.on((data) => {
               setUserId(data.userId);
               console.log(`User ${data.userId} logged in`);
           });

           return () => unsubscribe();
       }, []);

       if (!userId) return null;
       return <div>Welcome, user {userId}!</div>;
   }
   ```
## License

MIT
