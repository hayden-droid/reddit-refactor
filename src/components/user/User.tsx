import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/user/userContext'
import { RouteComponentProps } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { UserTrophies } from './UserTrophies'
import { Container } from '../style/basicStyles'
import { UserPosts } from './UserPosts'

interface UserProps
  extends RouteComponentProps<{
    userName: string
  }> {}

export const User: React.FC<UserProps> = ({ match }) => {
  const userContext = useContext(UserContext)

  const {
    userData,
    userPosts,
    userTrophies,
    getUserInfo,
    getUserPosts
  } = userContext

  useEffect(() => {
    getUserInfo!(match.params.userName)
    getUserPosts!(match.params.userName)

    return () => {
      getUserInfo!(null)
    }
  }, [])

  return (
    <Container>
      {userData && userTrophies && (
        <>
          <UserHeader userData={userData!} />
          <UserTrophies userTrophies={userTrophies!} />
        </>
      )}
      {userPosts && <UserPosts userPosts={userPosts} />}
    </Container>
  )
}
