import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";
import clsxm from "../lib/clsxm";
import { getTopArtists } from "../lib/queries";
import { Rubik_Puddles, Lacquer, Monoton, Oi } from "@next/font/google";

const rubikPuddles = Rubik_Puddles({ weight: "400", subsets: ["latin"] });
const lacquer = Lacquer({ weight: "400", subsets: ["latin"] });
const monoton = Monoton({ weight: "400", subsets: ["latin"] });
const oi = Oi({ weight: "400", subsets: ["latin"] });

const posters = {
	rock: "rock.jpg",
	psychedlic: "trippy.jpg",
	hipHop: "hipHop.jpg",
};

const Lineup = () => {
	const [limit, setLimit] = useState(50);
	const [timeRange, setTimeRange] = useState("long_term");
	const [style, setStyle] = useState("rock");
	const { data: session } = useSession();

	const { isLoading, isError, data, error } = useQuery("top_artists", () =>
		getTopArtists({
			limit: 50,
			time_range: timeRange,
		})
	);

	const handleClick = (e) => {
		e.preventDefault();
		setLimit(Number(e.target.value));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>There&amps;s been an error</div>;
	}

	const handleStyle = (e) => {
		e.preventDefault();
		setStyle(e.target.value);
	};

	return (
		<main className="mx-auto max-w-11/12 text-center">
			<section className="bg-neutral bg-opacity-60 relative md:w-4/5 w-full border mx-auto py-10">
				<Image
					alt="bg image"
					className="object-cover absolute -z-50 top-0"
					fill
					src={`/${posters[style]}`}
				/>
				<h1
					className={clsxm(
						"text-4xl py-4 text-primary-content",
						oi.className
					)}
				>
					Festival {session?.token?.name}
				</h1>
				<div
					className={clsxm(
						"text-secondary-content",
						rubikPuddles.className
					)}
				>
					<h2 className="text-2xl font-mono py-2 font-extrabold">
						Day 1
					</h2>
					<div className="grid grid-cols-2">
						<p className="col-span-2 text-5xl">{data[0].name}</p>
						{data &&
							data
								.slice(0, limit)
								.slice(3, limit / 3 + 1)
								.map((artist) => (
									<p key={artist.name}>{artist.name}</p>
								))}
					</div>
				</div>
				<div
					className={clsxm(
						"border-y border-dashed py-4 my-4 text-primary-content",
						monoton.className
					)}
				>
					<h2 className="text-2xl font-mono py-2 font-extrabold">
						Day 2
					</h2>
					<div className="grid grid-cols-2">
						<p className="text-5xl font-extrabold col-span-2">
							{data[1].name}
						</p>
						{data &&
							data
								.slice(0, limit)
								.slice(limit / 3 + 1, (limit / 3) * 2)
								.map((artist) => (
									<p key={artist.name}>{artist.name}</p>
								))}
					</div>
				</div>
				<div
					className={clsxm("text-primary-content", lacquer.className)}
				>
					<h2 className="text-2xl underline font-mono font-extrabold">
						Day 3
					</h2>
					<div className="grid grid-cols-2">
						<p className="text-5xl font-extrabold col-span-2">
							{data[2].name}
						</p>
						{data &&
							data
								.slice(0, limit)
								.slice((limit / 3 + 1) * 2, 50)
								.map((artist) => (
									<p key={artist.name}>{artist.name}</p>
								))}
					</div>
				</div>
			</section>
			<div className="flex gap-2 flex-col my-4 justify-center items-center">
				<div className="flex gap-2 items-center">
					<p className="font-bold">Festival size:</p>
					<button
						className={clsxm(
							"btn btn-sm",
							limit === 20 && "btn-disabled"
						)}
						value={15}
						onClick={(e) => handleClick(e)}
					>
						Small
					</button>
					<button
						className={clsxm(
							"btn btn-sm",
							limit === 30 && "btn-disabled"
						)}
						value={25}
						onClick={(e) => handleClick(e)}
					>
						Medium
					</button>
					<button
						className={clsxm(
							"btn btn-sm",
							limit === 50 && "btn-disabled"
						)}
						value={50}
						onClick={(e) => handleClick(e)}
					>
						Big
					</button>
				</div>
				<div className="flex gap-2 items-center">
					<p className="font-bold">Poster style:</p>
					<div className="flex gap-2">
						<button
							className={clsxm(
								"btn btn-sm",
								style === "psychedlic" && "btn-disabled"
							)}
							value={"psychedlic"}
							onClick={(e) => handleStyle(e)}
						>
							Psychedlic
						</button>
						<button
							className={clsxm(
								"btn btn-sm",
								style === "rock" && "btn-disabled"
							)}
							value={"rock"}
							onClick={(e) => handleStyle(e)}
						>
							Rock
						</button>
						<button
							className={clsxm(
								"btn btn-sm",
								style === "hipHop" && "btn-disabled"
							)}
							value={"hipHop"}
							onClick={(e) => handleStyle(e)}
						>
							Hip-hop
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Lineup;
