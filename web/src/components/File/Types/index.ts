export type FileData = {
  id: number
  name: string
  path: string
  size: number
  type: string
  createdAt: string
}

export type ExistingFilesData = {
  files: FileData[]
}

export type NewFile = {
  name: string
  path: string
  size: number
  type: string
}

export type FileType = {
  filename: string
  url: string
  size: number
  mimetype: string
}
