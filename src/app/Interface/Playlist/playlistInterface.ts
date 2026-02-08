export interface playlistInterface {
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

export interface tagsInterface {
  id: number;
  name: string;
}
