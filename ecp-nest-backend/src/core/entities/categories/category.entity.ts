export class ICategory {
  id: string;
  value: string;
  description: string;
  seasonId: string;
  parentCategoryId?: string;
  active?: boolean;
  createdBy: string;
}
