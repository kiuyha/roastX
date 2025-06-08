export interface XProfile {
  profilePicUrl: string;
  fullName: string;
  biography: string;
  isVerified: boolean;
  isPrivate: boolean;
  tweetsCount: number;
  followersCount: number;
  followsCount: number;
  tweets: tweet[] | [];
}

export interface tweet {
  date: string;
  likesCount: number;
  retweetsCount: number;
  commentsCount: number;
  quotesCount: number;
  caption: string;
}
