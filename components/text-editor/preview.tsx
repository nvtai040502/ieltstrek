"use client";
import dynamic from "next/dynamic";
import { Fragment, useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import { ReactQuillProps } from "react-quill";
import { Input } from "../ui/input";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  const segments = value.split("___");

  const renderedContent = segments.map((segment, index) => {
    return (
      <Fragment key={index}>
        {index > 0 && <Input />} {/* Render Input after the first segment */}
        {segment}
      </Fragment>
    );
  });

  return <ReactQuill theme="bubble" value={value} onChange={(e) => console.log(e)} readOnly />;
};
