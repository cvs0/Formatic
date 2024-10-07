export declare function Text(initialValue?: string): {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare function Toggle(initialValue?: boolean): {
    value: boolean;
    onChange: (newValue: boolean) => void;
};
export declare function List<T extends Record<string, any>>(spec: Record<string, () => T>): {
    items: T[];
    addItem: () => T[];
    removeItem: (index: number) => T[];
};
export declare function Group<T extends Record<string, any>>(spec: Record<string, () => T>): T;
export declare const useInit: (spec: Record<string, any>) => {
    updateState: (key: string, value: any) => void;
};
