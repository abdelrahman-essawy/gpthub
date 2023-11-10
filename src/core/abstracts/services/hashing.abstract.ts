export abstract class Hashing {
  abstract hash(data: string): string;
  abstract compare(data: string, hash: string): boolean;
}
