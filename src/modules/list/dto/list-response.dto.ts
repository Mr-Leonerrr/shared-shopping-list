export class ItemSummaryDto {
  id: number;
  name: string;
  quantity: number;
  price: number;
  note?: string;
  isCompleted?: boolean;
  createdAt: Date;
}

export class OwnerSummaryDto {
  id: number;
  username: string;
}

export class GroupSummaryDto {
  id: number;
  name: string;
}

export class ListResponseDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  owner: OwnerSummaryDto;
  group?: GroupSummaryDto | null;
  items: ItemSummaryDto[];
}
