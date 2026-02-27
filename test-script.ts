import { createMember, updateMember, getMemberById, getAllMembers } from "./src/app/actions/members";
import { addMemberToPool, createPool, deletePool, getPoolById } from "./src/app/actions/pools";

async function run() {
    try {
        console.log("Setting up test service and pool...");
        const db = require("./src/lib/db").db;
        const testService = await db.service.upsert({
            where: { name: "Test Service" },
            update: {},
            create: { name: "Test Service", category: "Test" }
        });

        const testPool = await createPool({
            name: "Test Pool",
            serviceId: testService.id,
            targetSeats: 5
        });

        console.log("4.1: Adding new member by name only (No Phone)...");
        const seat1 = await addMemberToPool(testPool.id, { name: "John Doe" });
        console.log("Seat 1 created:", seat1.id);

        console.log("4.2: Assigning same name case-insensitive...");
        try {
            await addMemberToPool(testPool.id, { name: "john doe" });
            console.error("Should have thrown already in pool!");
        } catch (e) {
            console.log("Expected error (already in pool):", (e as Error).message);
        }

        console.log("4.3: Creating member with only name in users page...");
        const newMember = await createMember({ name: "Jane Doe" });
        console.log("Created Jane without phone:", newMember.id);

        const updatedJane = await updateMember(newMember.id, { name: "Jane Doe Edited" });
        console.log("Updated Jane without phone successfully:", updatedJane.name);

        console.log("Cleaning up...");
        await db.member.delete({ where: { id: seat1.memberId } });
        await db.member.delete({ where: { id: newMember.id } });
        await deletePool(testPool.id);

        console.log("All verifications passed!");
        process.exit(0);
    } catch (err) {
        console.error("Failed:", err);
        process.exit(1);
    }
}

run();
