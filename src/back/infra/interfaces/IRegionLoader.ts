import { Region } from '../../models/Region/region';

export interface IRegionLoader {
  getRegion(): Region;
}
