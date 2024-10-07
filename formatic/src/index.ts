import { useState } from "react";

export function Text(initialValue: string = "") {
  const [value, setValue] = useState<string>(initialValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
  };
}

export function Toggle(initialValue: boolean = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  return {
    value,
    onChange: (newValue: boolean) => {
      setValue(newValue);
    },
  };
}

export function List<T extends Record<string, any>>(
  spec: Record<string, () => T>
) {
  const items: T[] = [];
  return {
    items,
    addItem: () => {
      const newItem = create<T>(spec);
      items.push(newItem);
      return items;
    },
    removeItem: (index: number) => {
      items.splice(index, 1);
      return items;
    },
  };
}

export function Group<T extends Record<string, any>>(
  spec: Record<string, () => T>
): T {
  return create(spec);
}

function create<T extends Record<string, any>>(
  spec: Record<string, () => T>
): T {
  const state: Record<string, any> = {};
  for (const key in spec) {
    state[key] = typeof spec[key] === "function" ? spec[key]() : spec[key];
  }
  return state as T;
}

export const useInit = (spec: Record<string, any>) => {
  const [state, setState] = useState(() => spec);

  const updateState = (key: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], value },
    }));
  };

  return { ...state, updateState };
};
