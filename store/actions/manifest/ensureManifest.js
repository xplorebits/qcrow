export default function (projectId) {
  if (!this.manifest?.[projectId]) {
    this.manifest[projectId] = []
  }
}
