// Import necessary types based on your project structure
// import { ResourceDocument as MongoDocument } from '../frameworks/databases/mongo/model/resource.model';
import { ResourceDocument } from 'frameworks/databases/mongo/model/resource.model';
import { IRepository, OptionsForFind } from './repository.abstract';
import { Resource as PrismaDocument } from '@prisma/client';

type Resource = PrismaDocument | ResourceDocument; // MongoDocument;

/**
 * Interface for the ResourceRepository.
 */
export interface IResourceRepository extends IRepository<Resource> {
  find(options?: OptionsForFind): Promise<Partial<Resource>[]>;

  uploadFile(file: Buffer, filename: string): Promise<Partial<Resource>>;

  createFromText(text: string): Promise<Partial<Resource>>;

  createFromGitHubRepo(repoLink: string): Promise<Partial<Resource>>;

  createFromGitLabRepo(repoLink: string): Promise<Partial<Resource>>;

  isFileExists(filename: string): Promise<boolean>;

  isTextExists(text: string): Promise<boolean>;

  isGitHubRepoExists(repoLink: string): Promise<boolean>;

  isGitLabRepoExists(repoLink: string): Promise<boolean>;
}
