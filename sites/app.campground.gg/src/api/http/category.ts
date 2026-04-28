import type { TentCategoryView } from "types/campground/tent";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPCategoryManager extends HTTPBackendObjectManager {
    create(campsite_id: string, bonfire_id: string, body: { name: string; description: string; position: number; }) {
        return this.client.post<TentCategoryView>({
            route: "gg.campground.tent.createCategory",
            queries: { campsite_id, bonfire_id, },
            body,
        });
    }
    
    update(category_id: string, body: { name?: string; description?: string; }) {
        return this.client.post<TentCategoryView>({
            route: "gg.campground.tent.updateCategory",
            queries: { category_id, },
            body,
        });
    }
    
    move(category_id: string, body: { bonfireId?: string; position?: number; }) {
        return this.client.post<TentCategoryView>({
            route: "gg.campground.tent.moveCategory",
            queries: { category_id, },
            body,
        });
    }
    
    delete(category_id: string) {
        return this.client.post<TentCategoryView>({
            route: "gg.campground.tent.deleteCategory",
            queries: { category_id, },
        });
    }
}