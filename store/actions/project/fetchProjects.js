export default async function () {
  const projects = await $fetch('/api/project/fetch-projects') || []
  this.projects = projects
  this.isReady = true

  return projects.length
}