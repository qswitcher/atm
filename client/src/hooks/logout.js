import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

const useLogout = () => {
  const history = useHistory()
  const client = useApolloClient()
  return () => {
    localStorage.removeItem('user_id')
    return client.cache.reset().then(() => {
      history.push('/login')
    })
  }
}

export default useLogout
