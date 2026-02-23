import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import { BoldIcon } from "@/components/icons/bold-icon";
import { ItalicIcon } from "@/components/icons/italic-icon";

export default function WritingPageEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],
    content: "",
  });

  const handleSave = async () => {
    if (!editor) return;

    const blogData = {
      title,
      description,
      content: editor.getJSON(),
    };

    console.log(blogData);

    if (!editor) return null;
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <div className="w-full lg:max-w-6xl  md:max-w-5xl px-6 py-16">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-5xl font-serif font-semibold bg-transparent outline-none mb-4"
        />

        {/* Description */}
        <textarea
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-lg text-zinc-600 bg-transparent outline-none resize-none mb-8"
        />

        <div className="border-t border-zinc-300 mb-8"></div>

        {/* 🔥 New Toolbar */}
        <Toolbar variant="default" style="normal" className="mb-6">
          <ToolbarGroup>
            <Button
              data-style="ghost"
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <BoldIcon className="tiptap-button-icon" />
            </Button>

            <Button
              data-style="ghost"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <ItalicIcon className="tiptap-button-icon" />
            </Button>

            <Button
              data-style="ghost"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              data-active={editor.isActive("heading", { level: 2 })}
            >
              H2
            </Button>

            <Button
              data-style="ghost"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              data-active={editor.isActive("bulletList")}
            >
              List
            </Button>
          </ToolbarGroup>

          <ToolbarSeparator />

          <ToolbarGroup>
            <Button
              data-style="ghost"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              data-active={editor.isActive("underline")}
            >
              U
            </Button>
          </ToolbarGroup>

          <Spacer />

          <ToolbarGroup>
            <Button data-style="primary" onClick={handleSave}>
              Publish
            </Button>
          </ToolbarGroup>
        </Toolbar>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="
    prose prose-lg text-3xl max-w-none text-gray-600
    p-4 rounded-md bg-white
    border border-gray-300
  "
        />

        {/* Save Button */}
        <div className="mt-10">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white rounded-sm"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
