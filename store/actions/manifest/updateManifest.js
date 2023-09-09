export default async function (data, projectId, manifestId) {
  const res = await $fetch(`/api/project/ops/${projectId}/manifest/ops/${manifestId}/update`, {
    method: "POST",
    body: data
  })

  this.ensureManifest(projectId)

  const ti = this.manifest[projectId].findIndex(x => x._id === res._id)
  if (ti > -1) {
    this.manifest[projectId][ti] = res
  }

  return true
}
