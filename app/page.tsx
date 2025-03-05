import Editor from "../components/Editor";

export default function Home() {
	return (
		<>
			<div className="h-fit">
				<div className="mx-auto max-w-screen-xl px-4 pb-10 py-32">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-3xl font-extrabold sm:text-7xl text-[#F7F7F7]">
							Write in Markdown
							<br />
							<strong className="font-extrabold text-2xl sm:text-6xl sm:block">
								Preview Instantly!
							</strong>
						</h1>

						<p className="mt-4 sm:text-xl/relaxed text-[#FFB22C]/80 mb-5">
							An easy way to write, preview, and refine Markdown.
						</p>
					</div>
				</div>
			</div>
			<div className="min-h-screen">
				<Editor />
			</div>
		</>
	);
}
