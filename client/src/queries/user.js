import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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

const useUser = user_id => {
  const { data, ...rest } = useQuery(GET_USER, {
    variables: { user_id },
  })
  return { user: (data || {}).user, ...rest }
}

export default useUser
