"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; 
import "prismjs/components/prism-javascript";

interface MarkdownPreviewProps {
	markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
	const [parsedMarkdown, setParsedMarkdown] = useState<string>("");

	useEffect(() => {
		const parseMarkdown = async () => {
			try {
				const html = await marked.parse(markdown);
				setParsedMarkdown(DOMPurify.sanitize(html));
			} catch (error) {
				console.error("Error parsing Markdown:", error);
				setParsedMarkdown("<p>Error rendering Markdown</p>");
			}
		};

		parseMarkdown();
	}, [markdown]);

	useEffect(() => {
		const container = document.querySelector(".markdown-content");
		if (container) {
			Prism.highlightAllUnder(container);
		}
	}, [parsedMarkdown]);

	return (
		<div
			className="w-1/2 p-4 overflow-y-auto bg-white border-l border-gray-300 markdown-content"
			dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
		/>
	);
};

export default MarkdownPreview;
