export declare function Text(initialValue?: string, validate?: (value: string) => string | null, useDebounce?: boolean, debounceWait?: number): {
    value: string;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
};
export declare function Toggle(initialValue?: boolean, validate?: (value: boolean) => string | null): {
    value: boolean;
    error: string | null;
    onChange: (newValue: boolean) => void;
    reset: () => void;
};
export declare function List<T extends Record<string, any>>(spec: Record<string, () => T>, initialState?: T[]): {
    items: T[];
    addItem: () => T[];
    removeItem: (index: number) => T[];
    reset: () => void;
};
export declare function Group<T extends Record<string, any>>(spec: Record<string, () => T>, initialState?: T): T;
export declare const useInit: <T extends Record<string, any>>(spec: T) => T & {
    updateState: (key: keyof T, value: any) => void;
    reset: () => void;
};
