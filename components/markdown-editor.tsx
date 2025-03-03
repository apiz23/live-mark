import { ChangeEvent, useRef } from "react";
import {
	Bold,
	Italic,
	Code,
	Link,
	List,
	ListOrdered,
	Heading,
	Undo,
	Redo,
	Edit,
} from "lucide-react";
import { Button } from "./ui/button";

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

		if (isBlock) {
			setMarkdown(
				`${before}\n\`\`\`py\n${selected || placeholder}\n\`\`\`\n${after}`
			);
		} else {
			setMarkdown(`${before}${syntax}${selected || placeholder}${syntax}${after}`);
		}

		textareaRef.current.focus();
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(e.target.value);
	};

	return (
		<div className="w-1/2 h-full flex flex-col border border-gray-300">
			{/* Toolbar */}
			<div className="flex justify-end items-center gap-2 p-2 text-black">
				<Button onClick={() => insertMarkdown("**", "Bold")} title="Bold">
					<Bold size={18} />
				</Button>
				<Button onClick={() => insertMarkdown("_", "Italic")} title="Italic">
					<Italic size={18} />
				</Button>
				<Button
					onClick={() =>
						insertMarkdown("", "let message = 'Hello world';\nalert(message);", true)
					}
					title="Code Block"
				>
					<Code size={18} />
				</Button>
				<Button
					onClick={() => insertMarkdown("[", "Link](https://)")}
					title="Insert Link"
				>
					<Link size={18} />
				</Button>
				<Button
					onClick={() => insertMarkdown("- ", "List Item")}
					title="Unordered List"
				>
					<List size={18} />
				</Button>
				<Button
					onClick={() => insertMarkdown("1. ", "List Item")}
					title="Ordered List"
				>
					<ListOrdered size={18} />
				</Button>
				<Button onClick={() => insertMarkdown("# ", "Heading")} title="Heading">
					<Heading size={18} />
				</Button>
				{/* <Button title="Undo">
					<Undo size={18} />
				</Button>
				<Button title="Redo">
					<Redo size={18} />
				</Button>
				<Button title="Edit">
					<Edit size={18} />
				</Button> */}
			</div>

			{/* Textarea */}
			<textarea
				ref={textareaRef}
				value={markdown}
				onChange={handleChange}
				placeholder="Write your Markdown here..."
				className="flex-1 p-4 text-lg font-mono border-none outline-none resize-none"
			/>
		</div>
	);
};

export default MarkdownEditor;
