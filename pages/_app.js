import "../styles/globals.css";
import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const queryClient = useRef(new QueryClient());
	return (
		<QueryClientProvider client={queryClient.current}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</QueryClientProvider>
	);
}
