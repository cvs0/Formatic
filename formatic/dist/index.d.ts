export declare function createTextField({ name, initialValue, validate, useDebounce, debounceWait, autoFocus, maxlength, }: {
    name: string;
    initialValue?: string;
    validate?: (value: string) => string | null;
    useDebounce?: boolean;
    debounceWait?: number;
    autoFocus?: boolean;
    maxlength?: number;
}): {
    name: string;
    id: string;
    value: string;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputref: import("react").RefObject<HTMLInputElement | null>;
    maxlength: number | undefined;
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
};
export declare function Group<T extends Record<string, any>>(spec: Record<string, () => T>, initialState?: T): T;
export declare const useInit: <T extends Record<string, any>>(spec: T) => T & {
    updateState: (key: keyof T, value: any) => void;
    reset: () => void;
};
