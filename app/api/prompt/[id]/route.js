import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

// GET (Read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        // Filter our prompts 
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found!", { status: 404})

        return new Response(JSON.stringify(prompt), { status : 200 })
    } catch (error) {
        return new Response("Failed to fetch all posts!", { status : 500 })
    }
}
// PATCH (Update)

export const PATCH = async(req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectToDB()
        // Find existing prompt
        const existingPrompt =  await Prompt.findById(params.id) 
        if(!existingPrompt) return new Response("Prompt not found!", { status: 404})
        // If it is found
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200})
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE (Delete)

export const DELETE = async(req, { params }) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to deleye prompt", { status : 500})
    }
}
