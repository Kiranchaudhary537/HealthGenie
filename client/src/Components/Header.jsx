import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header class=" z-10 w-full bg-white border sticky top-0 ">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" class="font-bold text-lg text-gray-800 d">
          Health Genie
        </a>
        <nav class="flex items-center">
          <ul class="flex space-x-4">
            <li>
              <Link
                to="/basicquery"
                className="text-gray-800 hover:text-blue-600  dark:hover:text-blue-600"
              >
                Basic Question
              </Link>
            </li>
            <li>
              <Link
                to="/symptomchecker"
                className="text-gray-800 hover:text-blue-600 dark:hover:text-blue-600"
              >
                Symptom Checker
              </Link>
            </li>
            {/* <li>
              <Link
                to="/mentalhealth"
                className="text-gray-800 hover:text-blue-600  dark:hover:text-blue-600"
              >
                Mental Health
              </Link>
            </li>
            <li>
              <Link
                to="/diseaserecongination"
                className="text-gray-800 hover:text-blue-600  dark:hover:text-blue-600"
              >
                Disease Recongnition
              </Link>
            </li> */}
          </ul>
          <button
            class="ml-4 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-2 dark:focus:ring-blue-600"
            aria-label="Toggle dark mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path class="heroicon-ui" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
              <path
                class="heroicon-ui"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 20a8 8 0 110-16 8 8 0 010 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
