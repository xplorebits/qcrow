export default async function (projectId, manifestId) {
  const result = await $fetch(`/api/project/ops/${projectId}/manifest/ops/${manifestId}/delete`)

  this.ensureManifest(projectId)
  const ti = this.manifest[projectId].findIndex(x => x._id === manifestId)

    if (ti > -1) {
      this.manifest[projectId].splice(ti, 1)
    }

  return result
}