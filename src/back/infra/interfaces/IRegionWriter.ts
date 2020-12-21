import { Region } from '../../models/Region/region';

export interface IRegionWriter {
  writeRegion(region: Region): void;
}
