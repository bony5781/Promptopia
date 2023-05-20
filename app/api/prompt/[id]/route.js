import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

//GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator');
        if (!prompts) {
            return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        }
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

//PATCH(update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (err) {
        return new Response("Failed to update the prompt", { status: 500 });
    }
}

//delete
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 });
    } catch (err) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}