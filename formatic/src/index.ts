import { useState, useCallback, useEffect } from "react";

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function Text(
  initialValue: string = "",
  validate?: (value: string) => string | null,
  useDebounce: boolean = true,
  debounceWait: number = 300
) {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const validateValue = useCallback(
    (newValue: string) => {
      if (validate) {
        setError(validate(newValue));
      }
    },
    [validate]
  );

  const debouncedValidate = useCallback(
    debounce((newValue: string) => {
      validateValue(newValue);
    }, debounceWait),
    [validateValue, debounceWait]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (useDebounce) {
        debouncedValidate(newValue);
      } else {
        validateValue(newValue);
      }
    },
    [debouncedValidate, validateValue, useDebounce]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    value,
    error,
    onChange,
    reset,
  };
}

export function Toggle(
  initialValue: boolean = false,
  validate?: (value: boolean) => string | null
) {
  const [value, setValue] = useState<boolean>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (newValue: boolean) => {
      setValue(newValue);
      if (validate) {
        setError(validate(newValue));
      }
    },
    [validate]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    value,
    error,
    onChange,
    reset,
  };
}

export function List<T extends Record<string, any>>(
  spec: Record<string, () => T>,
  initialState: T[] = []
) {
  const [items, setItems] = useState<T[]>(initialState);

  const addItem = useCallback(() => {
    const newItem = create<T>(spec);
    setItems((prevItems) => [...prevItems, newItem]);
    return items;
  }, [spec]);

  const removeItem = useCallback((index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    return items;
  }, []);

  const reset = useCallback(() => {
    setItems(initialState);
  }, [initialState]);

  return {
    items,
    addItem,
    removeItem,
    reset,
  };
}

export function Group<T extends Record<string, any>>(
  spec: Record<string, () => T>,
  initialState?: T
): T {
  return create(spec, initialState);
}

function create<T extends Record<string, any>>(
  spec: Record<string, () => T>,
  initialState?: T
): T {
  const state = (initialState || {}) as T;
  for (const key in spec) {
    if (Object.prototype.hasOwnProperty.call(spec, key)) {
      (state as any)[key] =
        typeof spec[key] === "function" ? spec[key]() : spec[key];
    }
  }
  return state;
}

export const useInit = <T extends Record<string, any>>(spec: T) => {
  const [state, setState] = useState<T>(() => spec);

  const updateState = useCallback((key: keyof T, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], value },
    }));
  }, []);

  const reset = useCallback(() => {
    setState(spec);
  }, [spec]);

  return { ...state, updateState, reset };
};
