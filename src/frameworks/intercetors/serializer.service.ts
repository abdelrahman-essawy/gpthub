import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';

@Injectable()
export class Serializer {
  remove(data: any, propertiesToRemove: string[]): any {
    if (data instanceof Document) {
      data = data.toObject();
    } else if (data.__prismaClient__) {
      // Assuming Prisma-generated objects have a "__prismaClient__" property
      data = { ...data };
      delete data.__prismaClient__;
    }

    return this.removeProperties(data, propertiesToRemove);
  }

  private removeProperties(data: any, propertiesToRemove: string[]): any {
    if (Array.isArray(data)) {
      // If the data is an array, remove properties from each item
      return data.map((item) =>
        this.removeProperties(item, propertiesToRemove),
      );
    } else if (typeof data === 'object' && data !== null) {
      // If the data is an object, remove specified properties
      const result: any = { ...data }; // Create a shallow copy to avoid modifying the original object
      propertiesToRemove.forEach((property) => delete result[property]);
      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          result[key] = this.removeProperties(result[key], propertiesToRemove);
        }
      }
      return result;
    } else {
      // If the data is neither an array nor an object, return it as is
      return data;
    }
  }
}
