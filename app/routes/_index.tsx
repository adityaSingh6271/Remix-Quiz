import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "SnapGrid Quiz" },
    { name: "description", content: "Welcome to SnapGrid Quiz!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to SnapGrid Quiz
          </h1>
          <div className="space-y-4">
            <Link
              to="/admin"
              className="block w-full bg-blue-600 text-white rounded-lg px-6 py-4 text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Admin View
              <p className="text-sm font-normal mt-1">
                Configure and manage quiz questions and settings
              </p>
            </Link>
            <Link
              to="/quiz"
              className="block w-full bg-green-600 text-white rounded-lg px-6 py-4 text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              User View
              <p className="text-sm font-normal mt-1">
                Take the quiz and test your knowledge
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}