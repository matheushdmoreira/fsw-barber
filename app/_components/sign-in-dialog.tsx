import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import { DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import Image from 'next/image'

export function SignInDialog() {
  async function handleLogInWithGoogleClick() {
    await signIn('google')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login</DialogTitle>
        <DialogDescription>Conecte-se com sua conta Google.</DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-2 font-bold"
        onClick={handleLogInWithGoogleClick}
      >
        <Image
          alt="Conecte-se com sua conta Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  )
}
