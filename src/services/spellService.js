const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getSpells() {
  const res = await fetch(`${BASE_URL}`)
  return res.json()
}

export {
  getSpells,
}