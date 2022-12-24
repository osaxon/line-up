import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import clsxm from "../lib/clsxm";
import { getTopArtists } from "../lib/queries";
import { Rubik_Gemstones, Lacquer, Monoton, Oi } from "@next/font/google";
import DaySection from "../components/DaySection";
import useAppState from "../store/state";
const rubikGemstones = Rubik_Gemstones({ weight: "400", subsets: ["latin"] });
const lacquer = Lacquer({ weight: "400", subsets: ["latin"] });
const monoton = Monoton({ weight: "400", subsets: ["latin"] });
const oi = Oi({ weight: "400", subsets: ["latin"] });

import SceneButton from "../components/SceneButton";

const posters = {
	rock: "rock.jpg",
	trippy: "trippy.png",
	mountains: "Landscape.png",
};

const Lineup = () => {
	const [style, setStyle] = useState("mountain");
	const { data: session } = useSession();
	const { currentScene, setScene, festivalName } = useAppState((state) => ({
		currentScene: state.currentScene,
		setScene: state.setScene,
		festivalName: state.festivalName,
	}));

	const { isLoading, isError, data, error } = useQuery("top_artists", () =>
		getTopArtists({
			limit: 50,
			time_range: "long_term",
		})
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>There&amps;s been an error</div>;
	}

	const handleStyle = (e) => {
		e.preventDefault();
		setScene(e.target.value);
	};

	const { dayOne, dayTwo, dayThree } = data;

	return (
		<main className="mx-auto max-w-11/12 text-center">
			<section className="relative md:w-[600px] w-full min-h-[calc(100vh-5rem)] border-4 border-primary-content mx-auto py-10">
				<Image
					alt="bg image"
					className="object-cover absolute -z-50 top-0"
					fill
					src={`/${posters[currentScene]}`}
				/>
				<div className="flex flex-col gap-4">
					{/* Day One */}
					<DaySection
						className="text-primary"
						dayData={dayOne}
						font={rubikGemstones}
					/>
					{/* Day Two */}
					<DaySection
						className="text-primary"
						dayData={dayTwo}
						font={lacquer}
					/>
					{/* Day Three */}
					<DaySection
						className="text-primary-content bg-primary"
						dayData={dayThree}
						font={monoton}
					/>
				</div>
			</section>
			<div className="flex gap-2flex-col my-4 justify-center items-center">
				<div className="flex gap-2 items-center">
					<p className="font-bold">Poster style:</p>
					<div className="flex gap-2">
						<SceneButton scene="mountains" />
						<SceneButton scene="trippy" />
					</div>
				</div>
			</div>
		</main>
	);
};

export default Lineup;
