import type { GetTentsOutput } from "types/tent";
import type { TypeToPayload } from "types/ws";
import type TentSidebar from "./TentSidebar";

const tentSidebarEventHandlers: Partial<{ [K in keyof TypeToPayload]: (payload: TypeToPayload[K], bonfires: Record<string, GetTentsOutput>, tentSidebar: TentSidebar,) => void;  }> = {
    // Bonfires
    BonfireDeleted(payload, bonfires, tentSidebar) {
        // Might be useless, as CampsiteLayout does it
        tentSidebar.bonfires = tentSidebar.bonfires.filter((x) => x.id !== payload.id);

        // Anything cached instantly deleted
        delete tentSidebar.bonfiresToTents[payload.id];

        if (tentSidebar.bonfireSelected.id !== payload.id)
            return;

        const cached = Object.keys(bonfires);

        // Navigate to last known cached tent
        tentSidebar.props.navigate(`/c/${tentSidebar.props.campsite.id}/t/${cached.length ? bonfires[cached[0]].tents[0].id : `bulletin`}`);
    },
    // Tents
    TentCreated(payload, bonfires) {
        bonfires[payload.bonfireId]?.tents.push(payload);
    },
    TentUpdated(payload, bonfires) {
        const existingTentModified = bonfires[payload.bonfireId].tents.find((x) => x.id === payload.id);

        if (existingTentModified)
            Object.assign(existingTentModified, payload);
    },
    TentMoved(payload, bonfires) {
        // Move other tents to make room for the new position; this is done in the back-end, but not notified directly
        const otherTentsInCategory = bonfires[payload.bonfireId]?.tents.filter((x) => x.id !== payload.id && x.categoryId === payload.categoryId);

        makeRoomForItems(payload, otherTentsInCategory);

        const previousTentState = Object.values(bonfires).flatMap((x) => x.tents).find((x) => x.id === payload.id);
        // One of:
        // Not in memory, but moved to cached bonfire, so it gets added
        // Nothing in memory about tent, nothing to change
        if (!previousTentState)
            return bonfires[payload.bonfireId]?.tents.push(payload);
        // It exists and has not been moved, so modify it and do nothing else
        else if (previousTentState.bonfireId === payload.bonfireId)
            return Object.assign(previousTentState!, payload);

        bonfires[previousTentState.bonfireId]
            .tents
            .splice(
                bonfires[previousTentState.bonfireId]
                    .tents
                    .findIndex((x) => x.id === payload.id)
                , 1
            );
        // Previous tent state (and therefore previous bonfire) is in memory, but possibly not the new bonfire it has been moved to,
        // so we removed the tent from cache and nothing else needs to be done
        // Otherwise, if it exists, then push the new state into the new bonfire in memory
        bonfires[payload.bonfireId]?.tents.push(payload);
    },
    TentDeleted(payload, bonfires) {
        const tentDeleted = bonfires[payload.bonfireId]?.tents.findIndex((x) => x.id === payload.id);
        bonfires[payload.bonfireId]?.tents.splice(tentDeleted, 1);
    },
    // Categories
    CategoryCreated(payload, bonfires) {
        bonfires[payload.bonfireId]?.categories.push(payload);
    },
    CategoryUpdated(payload, bonfires) {
        const existingCategoryModified = bonfires[payload.bonfireId].categories.find((x) => x.id === payload.id);

        if (existingCategoryModified)
            Object.assign(existingCategoryModified, payload);
    },
    CategoryMoved(payload, bonfires) {
        // Move other tents to make room for the new position; this is done in the back-end, but not notified directly
        const otherCategories = bonfires[payload.bonfireId]?.categories.filter((x) => x.id !== payload.id);

        makeRoomForItems(payload, otherCategories);

        const previousCategoryState = Object.values(bonfires).flatMap((x) => x.categories).find((x) => x.id === payload.id);
        // One of:
        // Not in memory, but moved to cached bonfire, so it gets added
        // Nothing in memory about tent, nothing to change
        if (!previousCategoryState)
            // TODO: Fetch its tents
            return bonfires[payload.bonfireId]?.categories.push(payload);
        // It exists and has not been moved, so modify it and do nothing else
        else if (previousCategoryState.bonfireId === payload.bonfireId)
            return Object.assign(previousCategoryState!, payload);

        const tentsToAlsoMove = bonfires[previousCategoryState.bonfireId]
            .tents
            .filter((x) => x.categoryId === previousCategoryState.id);

        bonfires[previousCategoryState.bonfireId]
            .categories
            .splice(
                bonfires[previousCategoryState.bonfireId]
                    .tents
                    .findIndex((x) => x.id === payload.id)
                , 1
            );
        // Remove all category's tents from the bonfire
        bonfires[previousCategoryState.bonfireId].tents = bonfires[previousCategoryState.bonfireId]
            .tents
            .filter((x) => x.categoryId !== previousCategoryState.id);
        // Previous category state (and therefore previous bonfire) is in memory, but possibly not the new bonfire it has been moved to,
        // so we removed the category from cache and nothing else needs to be done
        // Otherwise, if it exists, then push the new state into the new bonfire in memory
        bonfires[payload.bonfireId]?.tents.push(...tentsToAlsoMove);
        bonfires[payload.bonfireId]?.categories.push(payload);
    },
    CategoryDeleted(payload, bonfires) {
        const categoryDeleted = bonfires[payload.bonfireId]?.tents.findIndex((x) => x.id === payload.id);
        bonfires[payload.bonfireId]?.categories.splice(categoryDeleted, 1);
    },
}

export default tentSidebarEventHandlers;

function makeRoomForItems<T extends { id: string; position: number; }>(payload: T, others: Array<T>) {
    if (others?.some((x) => x.id !== payload.id && x.position === payload.position)) {
        for (const item of others.filter((x) => x.position >= payload.position))
            item.position++;
    }
}
