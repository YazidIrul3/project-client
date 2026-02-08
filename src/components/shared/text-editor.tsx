"use client";

import { EditorCommand, EditorContent, EditorRoot } from "novel";

export const WYSIWYGTextEditor = () => {
  return (
    <EditorRoot>
      <EditorContent>
        <EditorCommand />
      </EditorContent>
    </EditorRoot>
  );
};
