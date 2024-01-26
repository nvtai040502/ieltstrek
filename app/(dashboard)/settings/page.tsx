"use client";
import { logout } from "@/actions/auth/logout";
import { auth, signOut } from "@/auth"
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = async () => {
    await logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  )
}
export default SettingsPage