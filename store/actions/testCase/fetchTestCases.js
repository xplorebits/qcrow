export default async function (data) {
  const res = await $fetch("/api/test-case/get-all", {
    body: data,
  })

  if (res && Array.isArray(res)) {
    for(let index = 0; index < res.length; index++) {
      const ti = this.testCases.findIndex(x => x._id == res[index]._id)
      if (ti < 0) {
        this.testCases.push(res[index])
      }
    }
  }

  this.isReady = true

  return false
}
