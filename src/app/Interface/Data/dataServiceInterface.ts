export interface dataServiceInterface {
  getRanking(): object;
  getAll(lastId: number): object;
  getAllTags(): object;
  likePlaylist(data: object): object;
  heartPlaylist(data: object): object;
}
