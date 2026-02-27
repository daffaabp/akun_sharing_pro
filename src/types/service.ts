export type ServiceStatus = "active" | "inactive" | "maintenance";

export interface Service {
    id: string;
    name: string;
    category: string;
    status: ServiceStatus;
    description: string;
    url: string;
}

export const mockServices: Service[] = [
    {
        id: "1",
        name: "ChatGPT",
        category: "LLM Chat",
        status: "active",
        description: "OpenAI's conversational AI model.",
        url: "https://chatgpt.com",
    },
    {
        id: "2",
        name: "Cursor",
        category: "AI Code Editor",
        status: "active",
        description: "The AI-first code editor.",
        url: "https://cursor.sh",
    },
    {
        id: "3",
        name: "SciSpace",
        category: "Research",
        status: "active",
        description: "AI copilot for reading and understanding research papers.",
        url: "https://scispace.com",
    },
    {
        id: "4",
        name: "NotebookLM",
        category: "Research",
        status: "active",
        description: "Google's AI notebook for grounding information.",
        url: "https://notebooklm.google",
    },
    {
        id: "5",
        name: "Perplexity",
        category: "Search",
        status: "active",
        description: "AI-powered search engine.",
        url: "https://perplexity.ai",
    },
    {
        id: "6",
        name: "Midjourney",
        category: "Image Generation",
        status: "active",
        description: "Generative AI program for creating images from text.",
        url: "https://midjourney.com",
    },
    {
        id: "7",
        name: "Claude",
        category: "LLM Chat",
        status: "active",
        description: "Anthropic's AI assistant.",
        url: "https://claude.ai",
    },
    {
        id: "8",
        name: "V0",
        category: "UI Generation",
        status: "active",
        description: "Vercel's generous UI generation tool.",
        url: "https://v0.dev",
    }
];
