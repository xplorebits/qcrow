export default async function (projectId) {
  const res = await $fetch(`/api/project/ops/${projectId}/manifest/fetch-all`) || []

  this.ensureManifest(projectId)
  for (let index = 0; index < res.length; index++) {
    const indexData = res[index]
    if (this.manifest[projectId].findIndex(x => x._id === indexData._id) < 0) {
      this.manifest[projectId].push(indexData)
    }
  }

  return res.length
}