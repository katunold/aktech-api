export class GetCategoryDto {
  id: number;
  categoryName: string;
  createdBy: number;
  updatedById?: number;
  createdAtId?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
