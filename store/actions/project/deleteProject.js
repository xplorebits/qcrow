export default async function (projectId) {
  const result = await $fetch(`/api/project/ops/${projectId}/delete`)

  if (result) {
    const ti = this.projects.findIndex(x => x._id === projectId)

    if (ti > -1) {
      this.projects.splice(ti, 1)
    }
  }

  return result
}