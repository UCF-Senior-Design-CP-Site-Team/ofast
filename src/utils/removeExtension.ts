export default function removeExtension(filename: string) {
  return filename.substring(0, filename.indexOf('.'))
}
