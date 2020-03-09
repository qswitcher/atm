import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'

const GET_USER = gql`
  query GetUser($user_id: ID!) {
    user(id: $user_id) {
      _id
      name
      account {
        _id
        balance
      }
    }
  }
`

const useUser = () => {
  const user_id = localStorage.getItem('user_id')
  const { data, ...rest } = useQuery(GET_USER, {
    variables: { user_id },
  })
  const history = useHistory()
  if (!user_id) {
    history.push('/login')
    return { user: null }
  }
  return { user: (data || {}).user, ...rest }
}

export default useUser
