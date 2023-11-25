import { Model } from 'mongoose';
import { ResourceDocument } from 'frameworks/databases/mongo/model/resource.model';
import { IResourceRepository } from 'core/abstracts';
import { IMongoRepository } from '../repository';

/**
 * MongoDB repository for Resource.
 */
export class MongoResourceRepository
  extends IMongoRepository<ResourceDocument>
  implements IResourceRepository {
  constructor(_repository: Model<ResourceDocument>) {
    super(_repository);
  }

  async uploadFile(file: Buffer, filename: string): Promise<ResourceDocument> {
    // Implement file upload logic and create a new document in the database
    const resource = new this.repository({
      type: 'file',
      content: file,
      filename,
    });

    return resource.save();
  }

  async createFromText(text: string): Promise<ResourceDocument> {
    // Create a new document with raw text content
    const resource = new this.repository({
      type: 'text',
      content: text,
    });

    return resource.save();
  }

  async createFromGitHubRepo(repoLink: string): Promise<ResourceDocument> {
    // Implement logic to fetch data from the GitHub repository and create a document
    const resource = new this.repository({
      type: 'github_repo',
      content: repoLink,
    });

    return resource.save();
  }

  async createFromGitLabRepo(repoLink: string): Promise<ResourceDocument> {
    // Implement logic to fetch data from the GitLab repository and create a document
    const resource = new this.repository({
      type: 'gitlab_repo',
      content: repoLink,
    });

    return resource.save();
  }

  async isFileExists(filename: string): Promise<boolean> {
    const resource = await this.repository.findOne({ type: 'file', filename });
    return resource !== null;
  }

  async isTextExists(text: string): Promise<boolean> {
    const resource = await this.repository.findOne({
      type: 'text',
      content: text,
    });
    return resource !== null;
  }

  async isGitHubRepoExists(repoLink: string): Promise<boolean> {
    const resource = await this.repository.findOne({
      type: 'github_repo',
      content: repoLink,
    });
    return resource !== null;
  }

  async isGitLabRepoExists(repoLink: string): Promise<boolean> {
    const resource = await this.repository.findOne({
      type: 'gitlab_repo',
      content: repoLink,
    });
    return resource !== null;
  }
}
