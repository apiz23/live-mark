"use client";

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
import { useState } from "react";

export default function Editor() {
	const [markdown, setMarkdown] = useState<string>("");
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const isMobile = useIsMobile();

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<div className="md:p-4 pt-10">
			<div
				className={`flex transition-all duration-300 ease-in-out ${
					isFullscreen
						? "w-screen h-screen fixed top-0 left-0 bg-white"
						: "w-[80%] h-[90vh] mx-auto border shadow-md rounded-lg"
				} overflow-hidden`}
			>
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
