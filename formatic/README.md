# Formatic React

**Formatic React** is a **Headless Form Handling Library** designed to give developers full control over form rendering and complex input management. It provides an intuitive API for handling form logic while allowing complete flexibility with styling and components.

## Features

* **Headless**: Bring your own components and styles. Formatic React handles the form logic without imposing any specific UI framework or styling.
* **Composable**: Designed with flexibility in mind. Compose complex forms from simple building blocks like `Text`, `Toggle`, `List`, `Group`, and more.
* **Type-safe**: Built with TypeScript to ensure a robust and type-safe form handling experience.
* **Declarative API**: Manage form state and inputs with ease using a declarative approach.
* **Composable Inputs**: Use inputs like `Text`, `Toggle`, and `Group` for complex form structures while keeping control over how they are rendered.

## Installation

First, install the core library:

```bash
npm install formatic-react
```

Or, with Yarn:

```bash
yarn add formatic-react
```

## Getting Started

Here's a simple example to get you started with Formatic React

### In your Next.JS / React App

```typescript
import { Text, Toggle, Group } from 'formatic-react';

function MyForm() {
  const nameField = Text();
  const subscribedToggle = Toggle(false);

  return (
    <div>
      <label>
        Name:
        <input {...nameField} />
      </label>
      <label>
        Subscribed:
        <input
          type="checkbox"
          checked={subscribedToggle.value}
          onChange={() => subscribedToggle.onChange(!subscribedToggle.value)}
        />
      </label>
    </div>
  );
}

export default MyForm;
```

### Example Project

The `/formatic-example` directory contains a full-fledged Next.js project demonstrating how to integrate and use Formatic React.
```bash
cd formatic-example
npm install
```

Then, run the development server:
```bash
npm run dev
```

## Contributing

We welcome contributions to **Formatic React**! If you'd like to help improve the library, please feel free to open an issue or submit a pull request.

## Credits

**Formatic React** is solely developed by `cvs0`.