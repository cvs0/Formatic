"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Text, Toggle, Group } from "formatic-react";
import { useEffect } from "react";

export default function Home() {
  const nameField = Text();
  const emailField = Text();
  const subscribedToggle = Toggle(false);

  interface UserForm {
    name: ReturnType<typeof Text>;
    email: ReturnType<typeof Text>;
    subscribed: ReturnType<typeof Toggle>;
  }

  const userGroup = Group({
    name: () => Text(),
    email: () => Text(),
    subscribed: () => Toggle(false),
  }) as UserForm;

  useEffect(() => {
    console.log(nameField.value);
  }, [nameField.value]);

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
          <Input
            {...emailField}
            placeholder="Email"
            className="p-4 border rounded-md shadow-sm"
          />

          {/* Toggle for Subscription */}
          <div className="flex items-center gap-2">
            <label htmlFor="subscribe" className="text-gray-700">
              Subscribe to newsletter:
            </label>
            <input
              id="subscribe"
              type="checkbox"
              {...subscribedToggle}
              className="h-5 w-5"
            />{" "}
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
          <Input
            {...userGroup.email}
            placeholder="Email"
            className="p-4 border rounded-md shadow-sm mb-4"
          />
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
