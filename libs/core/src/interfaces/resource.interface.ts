import { IDatabaseEntity } from './interface';

export interface IResource extends IDatabaseEntity, IResourceContent {
  title: string;
  description?: string;
  type: ResourceType;
  format: ResourceFormat;
}

export interface IResourceContent {
  raw: string;
  indexed: string;
}

export enum ResourceType {
  BOOK = 'BOOK',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  ARTICLE = 'ARTICLE',
  CODE = 'CODE',
  OTHER = 'OTHER',
}

export enum ResourceFormat {
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX',
  XLS = 'XLS',
  XLSX = 'XLSX',
  PPT = 'PPT',
  PPTX = 'PPTX',
  MP3 = 'MP3',
  MP4 = 'MP4',
  WAV = 'WAV',
  AVI = 'AVI',
  MKV = 'MKV',
  JPG = 'JPG',
  JPEG = 'JPEG',
  PNG = 'PNG',
  GIF = 'GIF',
  OTHER = 'OTHER',
}
