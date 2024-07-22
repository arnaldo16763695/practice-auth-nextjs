import LoginForm from '@/components/LoginForm'

const LoginPage = ({searchParams}:{searchParams : {verified: string}}) => {
const isVerified = searchParams.verified === "true";
  return (
    <div>LoginPage

      <LoginForm isVerified={isVerified}/>
    </div>
  )
}

export default LoginPage