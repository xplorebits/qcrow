export default async function (data) {
  const res = await $fetch("/api/project/create-project", {
    method: "POST",
    body: data,
  })

  this.projects.push(res)

  return res._id
}
