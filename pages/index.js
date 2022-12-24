import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
	const { data: session } = useSession();
	if (session) {
		return (
			<main className="max-w-11/12 mx-auto p-4 h-screen">
				<section className="flex h-full flex-col items-center justify-center gap-10">
					Signed in as {session?.token?.email} <br />
					<button
						className="btn btn-primary"
						onClick={() => signOut()}
					>
						Sign Out
					</button>
				</section>
			</main>
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
							callbackUrl: `${window.location.origin}/lineup`,
						})
					}
				>
					Sign In
				</button>
			</section>
		</main>
	);
}
