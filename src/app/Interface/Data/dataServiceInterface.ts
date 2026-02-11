export interface DataServiceInterface {
  getRanking(): object;
  getAll(lastId: number): object;
  getAllTags(): object;
  likePlaylist(id: number): object;
  heartPlaylist(id: number): object;
  unlikePlaylist(id: number): object;
  unheartPlaylist(id: number): object;
}
