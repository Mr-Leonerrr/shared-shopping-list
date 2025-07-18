export class CreateListDto {
  name: string;
  ownerId: number;
  description?: string;
  groupId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
