import { SideLoadValues, SortValues } from './get-locus-query.dto';

export interface GetLocusQueryFilter {
  id?: number;
  assemblyId?: string;
  regionIds: number[];
  membershipStatus?: string;
  sideLoad?: SideLoadValues;
  sort: SortValues;
  page: number;
  limit: number;
}
