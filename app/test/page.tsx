"use client";

import TextEditor from "@/components/text-editor/editor";
import SelectableText from "@/components/text-editor/selected-text";

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold mb-4">Your Next.js App</h1>
        <SelectableText>
          <p className="bg-red-500">Select me to see the toolbar!</p>
        </SelectableText>
      </div>
      {/* <TextEditor /> */}
    </div>
  );
}
