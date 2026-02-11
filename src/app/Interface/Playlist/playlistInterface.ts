export interface PlaylistInterface {
  id: number;
  title: string;
  description: string;
  playList_Urls: string;
  platform_id: number;
  thumbnail: string;
  tags: [{ id: number; name: string }];
  popularity: [{ playlist_id: number; hearts: number; likes: number; rank: number }];
  platform: { id: number; name: string };
}

export interface TagsInterface {
  id: number;
  name: string;
}

export interface PlatformInterface {
  id: number;
  name: string;
}
