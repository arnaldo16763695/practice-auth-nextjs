import { auth } from "@/auth"
import LogoutButton from "@/components/LogoutButton";



const DashboardPage = async () => {
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>
  }
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  )
}

export default DashboardPage