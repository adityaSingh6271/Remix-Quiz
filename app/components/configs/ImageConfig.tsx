import React, { useState } from "react";

interface ImageConfigProps {
  config?: {
    url: string;
    alt: string;
  };
  questionNumber: number;
  totalQuestions: number;
  onChange: (config: NonNullable<ImageConfigProps["config"]>) => void;
}

export function ImageConfig({
  config,
  questionNumber,
  totalQuestions,
  onChange,
}: ImageConfigProps) {
  const [currentPage, setCurrentPage] = useState(questionNumber);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const currentConfig = config || {
    url: "",
    alt: "",
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...currentConfig,
          url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Image for Question {currentPage} of {totalQuestions}
        </h3>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalQuestions, prev + 1))
            }
            disabled={currentPage === totalQuestions}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setUploadMethod("url")}
            className={`px-4 py-2 rounded ${
              uploadMethod === "url" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setUploadMethod("file")}
            className={`px-4 py-2 rounded ${
              uploadMethod === "file" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            Upload File
          </button>
        </div>

        {uploadMethod === "url" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={currentConfig.url}
              onChange={(e) =>
                onChange({ ...currentConfig, url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-1 block w-full"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alt Text
          </label>
          <input
            type="text"
            value={currentConfig.alt}
            onChange={(e) =>
              onChange({ ...currentConfig, alt: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Descriptive text for the image"
          />
        </div>

        {currentConfig.url && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="border border-gray-200 rounded-lg p-2">
              <img
                src={currentConfig.url}
                alt={currentConfig.alt}
                className="max-w-full h-auto rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
