import { useRef } from "react";
import {
	Bold,
	Italic,
	Code,
	Link,
	List,
	ListOrdered,
	Heading,
	ImageIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useIsMobile } from "@/lib/use-mobile";

interface ToolbarProps {
	insertMarkdown: (
		syntax: string,
		placeholder?: string,
		isBlock?: boolean
	) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ insertMarkdown }) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className="flex justify-end items-center gap-2 p-2 text-black border-b border-gray-300">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm">
							ToolBars
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{/* Bold */}
						<DropdownMenuItem onClick={() => insertMarkdown("**", "Bold")}>
							<Bold size={18} className="mr-2" /> Bold
						</DropdownMenuItem>

						{/* Italic */}
						<DropdownMenuItem onClick={() => insertMarkdown("_", "Italic")}>
							<Italic size={18} className="mr-2" /> Italic
						</DropdownMenuItem>

						{/* Code Block */}
						<DropdownMenuItem
							onClick={() =>
								insertMarkdown(
									"",
									"let message = 'Hello world';\nalert(message);",
									true
								)
							}
						>
							<Code size={18} className="mr-2" /> Code Block
						</DropdownMenuItem>

						{/* Insert Link */}
						<DropdownMenuItem onClick={() => insertMarkdown("[", "Link](https://)")}>
							<Link size={18} className="mr-2" /> Insert Link
						</DropdownMenuItem>

						{/* Insert Image */}
						<DropdownMenuItem onClick={() => insertMarkdown("![", "Image URL]")}>
							<ImageIcon size={18} className="mr-2" /> Insert Image
						</DropdownMenuItem>

						{/* Unordered List */}
						<DropdownMenuItem onClick={() => insertMarkdown("- ", "List Item")}>
							<List size={18} className="mr-2" /> Unordered List
						</DropdownMenuItem>

						{/* Ordered List */}
						<DropdownMenuItem onClick={() => insertMarkdown("1. ", "List Item")}>
							<ListOrdered size={18} className="mr-2" /> Ordered List
						</DropdownMenuItem>

						{/* Heading */}
						<DropdownMenuItem onClick={() => insertMarkdown("# ", "Heading")}>
							<Heading size={18} className="mr-2" /> Heading
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	// Desktop View: Show All Buttons Inline
	return (
		<div className="flex justify-end items-center gap-2 p-2 text-black border-b border-gray-300">
			{/* Bold */}
			<Button onClick={() => insertMarkdown("**", "Bold")} title="Bold">
				<Bold size={18} />
			</Button>

			{/* Italic */}
			<Button onClick={() => insertMarkdown("_", "Italic")} title="Italic">
				<Italic size={18} />
			</Button>

			{/* Code Block */}
			<Button
				onClick={() =>
					insertMarkdown("", "let message = 'Hello world';\nalert(message);", true)
				}
				title="Code Block"
			>
				<Code size={18} />
			</Button>

			{/* Insert Link */}
			<Button
				onClick={() => insertMarkdown("[", "Link](https://)")}
				title="Insert Link"
			>
				<Link size={18} />
			</Button>

			{/* Insert Image */}
			<Button
				onClick={() => insertMarkdown("![", "Image URL]")}
				title="Insert Image"
			>
				<ImageIcon className="w-5 h-5" />
			</Button>

			{/* Unordered List */}
			<Button
				onClick={() => insertMarkdown("- ", "List Item")}
				title="Unordered List"
			>
				<List size={18} />
			</Button>

			{/* Ordered List */}
			<Button
				onClick={() => insertMarkdown("1. ", "List Item")}
				title="Ordered List"
			>
				<ListOrdered size={18} />
			</Button>

			{/* Heading */}
			<Button onClick={() => insertMarkdown("# ", "Heading")} title="Heading">
				<Heading size={18} />
			</Button>
		</div>
	);
};

export default Toolbar;
