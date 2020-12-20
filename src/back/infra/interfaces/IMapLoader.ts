import { Map } from "../../models/Map/map";

export interface IMapLoader {
    getMap(): Map;
}