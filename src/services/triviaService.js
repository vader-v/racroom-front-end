// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/trivia`

async function indexTrivia(){
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function create(triviaFormData) {
  try {
    // BASE_URL IS POST http://localhost:3001/api/trivia
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(triviaFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function showTrivia(triviaId) {
  try {
    const res =await fetch(`${BASE_URL}/${triviaId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    }) 
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updateTrivia(triviaFormData) {
	try {
		const res = await fetch(`${BASE_URL}/${triviaFormData._id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${tokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(triviaFormData)
		})
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

async function deleteTrivia(triviaId) {
  try {
    const res = await fetch(`${BASE_URL}/${triviaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function addScore(triviaId, scoreData) {
  try {
    const res = await fetch(`${BASE_URL}/${triviaId}/scores`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updateScore(triviaId, scoreId, scoreData) {
  try {
    const res = await fetch(`${BASE_URL}/${triviaId}/scores/${scoreId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function getTriviaById(triviaId) {
  try {
    const res = await fetch(`${BASE_URL}/${triviaId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  indexTrivia,
  showTrivia,
  create,
  updateTrivia,
  deleteTrivia,
  addScore,
  updateScore,
  getTriviaById 
}