import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { prompt } = await request.json();

	if (!prompt) {
		return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
	}

	try {
		const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

		const response = await hf.textGeneration({
			model: "gpt2",
			inputs: prompt,
			parameters: {
				max_new_tokens: 100, 
			},
		});

		const generatedText = (response as any)[0]?.generated_text || "";

		return NextResponse.json({ content: generatedText });
	} catch (error) {
		console.error("Error generating content:", error);
		return NextResponse.json(
			{ error: "Failed to generate content" },
			{ status: 500 }
		);
	}
}
