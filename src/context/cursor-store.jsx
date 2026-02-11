import { createContext, useCallback, useContext, useState } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
    // Priority Stack: { level: number, id: string, type: 'DEFAULT' | 'LINK' | 'CLICK' | 'HIDDEN' }
    const [stack, setStack] = useState([]);

    // Current active type derived from top of stack
    const cursorType = stack.length > 0
        ? stack.sort((a, b) => b.level - a.level)[0].type
        : 'DEFAULT';

    const addRequest = useCallback((id, type, level = 10) => {
        setStack(prev => {
            // Remove existing request from this ID if any
            const filtered = prev.filter(req => req.id !== id);
            return [...filtered, { id, type, level }];
        });
    }, []);

    const removeRequest = useCallback((id) => {
        setStack(prev => prev.filter(req => req.id !== id));
    }, []);

    return (
        <CursorContext.Provider value={{ cursorType, addRequest, removeRequest }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    return useContext(CursorContext);
}
