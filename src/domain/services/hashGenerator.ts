export interface HashGenerator {
  hash: (plain: string) => Promise<string>
  compareSync: (plain: string, digest: string) => boolean
}
