export default async function (data, projectId) {
  console.log(projectId, data)
  const res = await $fetch(`/api/project/ops/${projectId}/manifest/create`, {
    method: "POST",
    body: data
  })

  this.ensureManifest(projectId)
  this.manifest[projectId].push(res)

  return res._id
}
