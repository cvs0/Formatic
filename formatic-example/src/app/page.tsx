"use client";
import { Input } from "@/components/ui/input";
import { createTextField, Toggle, Group } from "formatic-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nameField = createTextField({
    name: "name",
    initialValue: "",
    validate: (value: string) => value.length < 3 ? "Name too short" : null
  });
  
  const emailField = createTextField({
    name: "email",
    initialValue: "",
    validate: (value: string) => !value.includes("@") ? "Invalid email" : null
  });
  
  const subscribedToggle = Toggle(false);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 bg-linear-to-r from-blue-100 to-purple-100">
      <main className="max-w-2xl mx-auto flex flex-col items-center gap-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-extrabold text-center text-gray-800">
          Formatic
        </h1>
        <p className="text-lg text-center text-gray-600 mb-4">
          A powerful and flexible form management library.
        </p>

        <div className="flex flex-col gap-6 w-full">
          <Input
            {...nameField}
            placeholder="Name"
            className="p-4 border rounded-md shadow-xs"
          />
          {nameField.error && <p className="text-red-500">{nameField.error}</p>}
          <Input
            {...emailField}
            placeholder="Email"
            className="p-4 border rounded-md shadow-xs"
          />
          {emailField.error && (
            <p className="text-red-500">{emailField.error}</p>
          )}
          <div className="flex items-center gap-2">
            <label htmlFor="subscribe" className="text-gray-700">
              Subscribe to newsletter:
            </label>
            <input
              id="subscribe"
              type="checkbox"
              checked={subscribedToggle.value}
              onChange={() =>
                subscribedToggle.onChange(!subscribedToggle.value)
              }
              className="h-5 w-5"
            />
          </div>
        </div>

        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Output</h2>
          <div className="p-4 border rounded-md shadow-xs bg-gray-50">
            <p>
              <strong>Name:</strong> {nameField.value}
            </p>
            <p>
              <strong>Email:</strong> {emailField.value}
            </p>
            <p>
              <strong>Subscribed:</strong>{" "}
              {subscribedToggle.value ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
