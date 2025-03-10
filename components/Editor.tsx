"use client";

import { useEffect, useState } from "react";
import MarkdownEditor from "@/components/markdown-editor";
import MarkdownPreview from "@/components/markdown-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/lib/use-mobile";
import { Minimize, Maximize } from "lucide-react";
import { marked } from "marked";

export default function Editor() {
	const [markdown, setMarkdown] = useState<string>(() => {
		if (typeof window !== "undefined") {
			const savedMarkdown = localStorage.getItem("markdown");
			return savedMarkdown || "";
		}
		return "";
	});

	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const isMobile = useIsMobile();

	useEffect(() => {
		localStorage.setItem("markdown", markdown);
	}, [markdown]);

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	const handleExportMarkdown = () => {
		const blob = new Blob([markdown], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "document.md";
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleExportHTML = async () => {
		try {
			const htmlContent = await marked.parse(markdown);
			const blob = new Blob([htmlContent], { type: "text/html" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "document.html";
			link.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error exporting HTML:", error);
		}
	};

	return (
		<div className="md:p-4 pt-10">
			<div
				className={`transition-all duration-300 ease-in-out ${
					isFullscreen
						? "w-screen h-screen fixed top-0 left-0 bg-white"
						: "w-[80%] h-[90vh] mx-auto shadow-md rounded-lg"
				} overflow-hidden`}
			>
				{/* Export Buttons */}
				<div className="py-4 border-b border-gray-300 flex gap-2 justify-end bg-black">
					<Button className="bg-[#854836]/60" onClick={handleExportMarkdown}>Export as Markdown</Button>
					<Button className="bg-[#854836]/60" onClick={handleExportHTML}>Export as HTML</Button>
				</div>

				<Card className="w-full h-full rounded-none relative p-0 border-none">
					<CardContent className="h-full p-0">
						<div className={`absolute top-2 z-10 ${isMobile ? "left-2" : "right-2"}`}>
							<Button variant="outline" size="sm" onClick={toggleFullscreen}>
								{isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
							</Button>
						</div>

						<ResizablePanelGroup
							direction={isMobile ? "vertical" : "horizontal"}
							className="h-full"
						>
							<ResizablePanel className="h-full">
								<MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel className="h-full">
								<MarkdownPreview markdown={markdown} />
							</ResizablePanel>
						</ResizablePanelGroup>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
