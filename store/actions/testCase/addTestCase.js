export default async function (data) {
  const res = await $fetch("/api/test-case/create", {
    method: "POST",
    body: data,
  })

  this.testCases.push(res)

  return res._id
}
