import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session?.token?.email} <br />
				<button onClick={() => signOut()}>Sign Out</button>
			</>
		);
	}
	return (
		<>
			<button onClick={() => signIn()}>Sign In</button>
		</>
	);
}
