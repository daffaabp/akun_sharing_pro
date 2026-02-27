import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    console.log("Seeding services...");

    const services = [
        { name: "ChatGPT", category: "LLM Chat", status: "active", description: "OpenAI's conversational AI model.", url: "https://chatgpt.com" },
        { name: "Cursor", category: "AI Code Editor", status: "active", description: "The AI-first code editor.", url: "https://cursor.sh" },
        { name: "SciSpace", category: "Research", status: "active", description: "AI copilot for reading and understanding research papers.", url: "https://scispace.com" },
        { name: "NotebookLM", category: "Research", status: "active", description: "Google's AI notebook for grounding information.", url: "https://notebooklm.google" },
        { name: "Perplexity", category: "Search", status: "active", description: "AI-powered search engine.", url: "https://perplexity.ai" },
        { name: "Midjourney", category: "Image Generation", status: "active", description: "Generative AI program for creating images from text.", url: "https://midjourney.com" },
        { name: "Claude", category: "LLM Chat", status: "active", description: "Anthropic's AI assistant.", url: "https://claude.ai" },
        { name: "V0", category: "UI Generation", status: "active", description: "Vercel's generous UI generation tool.", url: "https://v0.dev" },
    ];

    for (const service of services) {
        await db.service.upsert({
            where: { name: service.name },
            update: service,
            create: service,
        });
        console.log(`  ✓ ${service.name}`);
    }

    // ── Seed emails ──────────────────────────────────────────────────────────
    console.log("\nSeeding emails...");
    const emails = [
        { email: "optimismaju57@gmail.com", label: "Master Account #1001", status: "active" },
        { email: "hebatsukses57@gmail.com", label: "Master Account #1002", status: "active" },
        { email: "hebatinovatif57@gmail.com", label: "Master Account #1003", status: "active" },
        { email: "kitainovatif57@gmail.com", label: "Master Account #1004", status: "active" },
        { email: "ayo57ayo@gmail.com", label: "Master Account #1005", status: "active" },
        { email: "inovatif5758@gmail.com", label: "Master Account #1006", status: "active" },
        { email: "paztibizayuk@gmail.com", label: "Master Account #1007", status: "active" },
        { email: "optimiz57@gmail.com", label: "Master Account #1008", status: "active" },
        { email: "pastibiza5757@gmail.com", label: "Master Account #1009", status: "active" },
        { email: "rajinmaju57@gmail.com", label: "Master Account #1010", status: "active" },
        { email: "majuyukbisa@gmail.com", label: "Master Account #1011", status: "active" },
        { email: "jayainovatif@gmail.com", label: "Master Account #1012", status: "active" },
        { email: "sukseshebat57@gmail.com", label: "Master Account #1013", status: "active" },
        { email: "ayopastibisa57@gmail.com", label: "Master Account #1014", status: "active" },
        { email: "57dwirahayu@gmail.com", label: "Master Account #1015", status: "active" },
        { email: "pasti57bisa@gmail.com", label: "Master Account #1016", status: "active" },
        { email: "kreatif57maju@gmail.com", label: "Master Account #1017", status: "active" },
        { email: "kelas57inovatif@gmail.com", label: "Master Account #1018", status: "active" },
    ];

    for (const e of emails) {
        await db.email.upsert({
            where: { email: e.email },
            update: { email: e.email, status: e.status },
            create: { email: e.email, status: e.status },
        });
        console.log(`  ✓ ${e.email}`);
    }

    console.log("Done.");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await db.$disconnect(); });
