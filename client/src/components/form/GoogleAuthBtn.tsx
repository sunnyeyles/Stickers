import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { SignUp, useAuth } from '@clerk/clerk-react'
import { Button } from '@mantine/core'

export const GoogleAuthBtn = () => {
  const { isLoaded, signUp } = useSignUp()
  const [btnRendered, renderBtn] = useState<boolean>(false)

  if (!isLoaded) {
    // handle loading state
    return null
  }

  return (
    <div>
      <Button onClick={() => renderBtn(true)} />
      {btnRendered ? <SignUp /> : null}
      The current sign-up attempt status is {signUp.status}.
    </div>
  )
}
