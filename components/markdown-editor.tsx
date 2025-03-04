import { ChangeEvent, useRef } from "react";
import { Textarea } from "./ui/textarea";
import Toolbar from "./toolbars";

interface MarkdownEditorProps {
	markdown: string;
	setMarkdown: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
	markdown,
	setMarkdown,
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const insertMarkdown = (
		syntax: string,
		placeholder: string = "",
		isBlock = false
	) => {
		if (!textareaRef.current) return;

		const { selectionStart, selectionEnd } = textareaRef.current;
		const before = markdown.slice(0, selectionStart);
		const selected = markdown.slice(selectionStart, selectionEnd);
		const after = markdown.slice(selectionEnd);

		let newMarkdown = "";
		if (isBlock) {
			newMarkdown = `${before}\n\`\`\`\n${
				selected || placeholder
			}\n\`\`\`\n${after}`;
		} else if (syntax === "![") {
			newMarkdown = `${before}![Alt Text](${
				selected || "https://example.com/image.jpg"
			})${after}`;
		} else {
			newMarkdown = `${before}${syntax}${
				selected || placeholder
			}${syntax}${after}`;
		}

		setMarkdown(newMarkdown);
		textareaRef.current.focus();
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(e.target.value);
	};

	return (
		<div className="h-full flex flex-col border-l border-y border-gray-300">
			<Toolbar insertMarkdown={insertMarkdown} />

			<Textarea
				ref={textareaRef}
				value={markdown}
				onChange={handleChange}
				placeholder="Write your Markdown here..."
				className="flex-1 p-4 text-sm font-mono border-none outline-none resize-none rounded-none"
			/>
		</div>
	);
};

export default MarkdownEditor;
