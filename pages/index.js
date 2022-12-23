import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session?.token?.email} <br />
				<button className="btn btn-primary" onClick={() => signOut()}>
					Sign Out
				</button>
			</>
		);
	}
	return (
		<main className="max-w-11/12 mx-auto p-4 h-screen">
			<section className="flex border border-primary h-full flex-col items-center justify-center gap-10">
				<h1 className="text-5xl text-center">
					Sign in to create your dream music lineup!
				</h1>
				<button
					className="btn btn-primary"
					onClick={() =>
						signIn("spotify", {
							callbackUrl: "/lineup",
						})
					}
				>
					Sign In
				</button>
			</section>
		</main>
	);
}
