import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "react-query";
import clsxm from "../lib/clsxm";
import { getTopArtists } from "../lib/queries";

const posters = {
	rock: "rock.jpg",
	psychedlic: "trippy.jpg",
	hipHop: "hipHop.jpg",
};

const Lineup = () => {
	const [limit, setLimit] = useState(50);
	const [timeRange, setTimeRange] = useState("long_term");
	const [style, setStyle] = useState("rock");

	useEffect(() => {
		console.log(limit);
	}, [limit]);

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
			<div className="flex gap-2 flex-col my-4 justify-center items-center">
				<div className="flex gap-4 items-center">
					<p className="font-bold">Festival size:</p>
					<button
						className={clsxm("btn", limit === 15 && "btn-disabled")}
						value={15}
						onClick={(e) => handleClick(e)}
					>
						Small
					</button>
					<button
						className={clsxm("btn", limit === 25 && "btn-disabled")}
						value={25}
						onClick={(e) => handleClick(e)}
					>
						Medium
					</button>
					<button
						className={clsxm("btn", limit === 50 && "btn-disabled")}
						value={50}
						onClick={(e) => handleClick(e)}
					>
						Big
					</button>
				</div>
				<div className="flex gap-4 items-center">
					<p className="font-bold">Poster style:</p>
					<div className="flex gap-4">
						<button
							className={clsxm(
								"btn",
								style === "psychedlic" && "btn-disabled"
							)}
							value={"psychedlic"}
							onClick={(e) => handleStyle(e)}
						>
							Psychedlic
						</button>
						<button
							className={clsxm(
								"btn",
								style === "rock" && "btn-disabled"
							)}
							value={"rock"}
							onClick={(e) => handleStyle(e)}
						>
							Rock
						</button>
						<button
							className={clsxm(
								"btn",
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
			<section className="bg-neutral bg-opacity-60 relative w-4/5 mx-auto py-10">
				<Image
					alt="bg image"
					className="object-cover absolute -z-50 top-0"
					fill
					src={`/${posters[style]}`}
				/>
				<div>
					<h2 className="text-4xl font-extrabold">Day 1</h2>
					<div className="grid grid-cols-2">
						<p className="text-5xl font-extrabold col-span-2">
							{data[0].name}
						</p>
						{data &&
							data
								.slice(0, limit)
								.slice(3, limit / 3 + 1)
								.map((artist) => (
									<p key={artist.name}>{artist.name}</p>
								))}
					</div>
				</div>
				<div>
					<h2 className="text-4xl font-extrabold">Day 2</h2>
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
				<div>
					<h2 className="text-4xl font-extrabold">Day 3</h2>
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
		</main>
	);
};

export default Lineup;
