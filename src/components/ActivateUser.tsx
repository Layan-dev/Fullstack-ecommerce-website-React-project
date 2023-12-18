import { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router'
import { AxiosError } from 'axios'

export default function ActivateUser() {
  const params = useParams()
  console.log(params)
  const [state, setState] = useState({
    isLoading: false,
    response: ''
  })

  useEffect(() => {
    const handleActivate = async () => {
      try {
        const res = await api.get(`/api/auth/activateUser/${params.activationToken}`)
        console.log(res)
        setState({ ...state, response: res.data.msg })
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({ ...state, response: error.response?.data.msg })
        }
      }
    }

    handleActivate()
  }, [])

  return (
    <div>
      <p>{state.response}</p>
    </div>
  )
}
