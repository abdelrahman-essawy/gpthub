import { closest, distance } from 'fastest-levenshtein';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StringMatcherService {
  matchStrings(str1: string, str2: string): number {
    const closestString = closest(str1, [str2]);
    return distance(str1, closestString);
  }
}
