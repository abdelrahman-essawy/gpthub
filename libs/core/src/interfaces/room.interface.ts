import { IDatabaseEntity } from './interface';

export interface IRoom extends IRoomDatabaseEntity {
  title: string;
  description?: string;
  roomType: RoomType;
}

export interface IRoomDatabaseEntity extends IDatabaseEntity {
  authorId: string;
  resourceIds: string[];
  participantIds: string[];
  ownerIds: string[];
  moderatorIds: string[];
  collaboratorIds: string[];
}

export enum RoomType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
