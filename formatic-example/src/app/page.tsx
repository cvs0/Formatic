"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Text, Toggle, Group } from "formatic-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nameField = Text("", (value: string) =>
    value.length < 3 ? "Name too short" : null
  );
  const emailField = Text("", (value: string) =>
    !value.includes("@") ? "Invalid email" : null
  );
  const subscribedToggle = Toggle(false);

  interface UserForm {
    name: ReturnType<typeof Text>;
    email: ReturnType<typeof Text>;
    subscribed: ReturnType<typeof Toggle>;
  }

  const userGroup = Group({
    name: () =>
      Text("", (value: string) => (value.length < 3 ? "Name too short" : null)),
    email: () =>
      Text("", (value: string) =>
        !value.includes("@") ? "Invalid email" : null
      ),
    subscribed: () => Toggle(false),
  }) as UserForm;

  useEffect(() => {
    console.log(nameField.value);
  }, [nameField.value]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 bg-gradient-to-r from-blue-100 to-purple-100">
      <main className="max-w-2xl mx-auto flex flex-col items-center gap-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-extrabold text-center text-gray-800">
          Formatic
        </h1>
        <p className="text-lg text-center text-gray-600 mb-4">
          A powerful and flexible form management library.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Feature Cards */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-64">
            <h3 className="font-semibold text-lg mb-2">Dynamic Fields</h3>
            <p className="text-gray-600">
              Create fields dynamically with ease using Formatic&apos;s simple
              API.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-64">
            <h3 className="font-semibold text-lg mb-2">Real-time Validation</h3>
            <p className="text-gray-600">
              Ensure data integrity with built-in validation checks as users
              type.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-64">
            <h3 className="font-semibold text-lg mb-2">Group Management</h3>
            <p className="text-gray-600">
              Manage related fields together with group functionality.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* Input Fields */}
          <Input
            {...nameField}
            placeholder="Name"
            className="p-4 border rounded-md shadow-sm"
          />
          {nameField.error && <p className="text-red-500">{nameField.error}</p>}
          <Input
            {...emailField}
            placeholder="Email"
            className="p-4 border rounded-md shadow-sm"
          />
          {emailField.error && (
            <p className="text-red-500">{emailField.error}</p>
          )}

          {/* Toggle for Subscription */}
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

        {/* Output Boxes */}
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Output</h2>
          <div className="p-4 border rounded-md shadow-sm mb-4 bg-gray-50">
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

        {/* Render User Group */}
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">User Form</h2>
          <Input
            {...userGroup.name}
            placeholder="Name"
            className="p-4 border rounded-md shadow-sm mb-4"
          />
          {userGroup.name.error && (
            <p className="text-red-500">{userGroup.name.error}</p>
          )}
          <Input
            {...userGroup.email}
            placeholder="Email"
            className="p-4 border rounded-md shadow-sm mb-4"
          />
          {userGroup.email.error && (
            <p className="text-red-500">{userGroup.email.error}</p>
          )}
          <div className="flex items-center gap-2">
            <label htmlFor="formSubscribe" className="text-gray-700">
              Subscribed:
            </label>
            <input
              id="formSubscribe"
              type="checkbox"
              checked={userGroup.subscribed.value}
              onChange={() =>
                userGroup.subscribed.onChange(!userGroup.subscribed.value)
              }
              className="h-5 w-5"
            />
          </div>
        </div>

        {/* Output Boxes for User Group */}
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            User Group Output
          </h2>
          <div className="p-4 border rounded-md shadow-sm mb-4 bg-gray-50">
            <p>
              <strong>Name:</strong> {userGroup.name.value}
            </p>
            <p>
              <strong>Email:</strong> {userGroup.email.value}
            </p>
            <p>
              <strong>Subscribed:</strong>{" "}
              {userGroup.subscribed.value ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to cvs0.xyz →
        </a>
      </footer>
    </div>
  );
}
