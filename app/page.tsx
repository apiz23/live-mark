"use client";

import { useState } from "react";
import MarkdownEditor from "@/components/markdown-editor";
import MarkdownPreview from "@/components/markdown-preview";

export default function Home() {
	const [markdown, setMarkdown] = useState<string>("");

	return (
		<div className="flex h-screen">
			<MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
			<MarkdownPreview markdown={markdown} />
		</div>
	);
}
