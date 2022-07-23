export type User = {
  username: string;
  avatar: string;
  bio: string;
  index: number;
};

export type Spling = {
  name: string;
  bio: string;
  avatar: string;
};

export type Post = {
  text: string;
  image: string;
};

export type Reply = {
  text: string;
};

export enum TipSize {
  Small,
  Medium,
  Big,
}
export interface FileData {
  name: string;
  type: string;
  size: string;
  base64: string;
}
