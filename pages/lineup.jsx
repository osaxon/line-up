import { useEffect } from "react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import clsxm from "../lib/clsxm";
import { getTopArtists } from "../lib/queries";

const Lineup = () => {
	const [limit, setLimit] = useState(50);
	const [timeRange, setTimeRange] = useState("long_term");

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

	return (
		<main className="mx-auto max-w-11/12 text-center">
			<div className="flex gap-2">
				<button
					className={clsxm(
						"font-bold",
						limit === 10 && "text-red-500"
					)}
					value={10}
					onClick={(e) => handleClick(e)}
				>
					Small
				</button>
				<button
					className={clsxm(
						"font-bold",
						limit === 25 && "text-red-500"
					)}
					value={25}
					onClick={(e) => handleClick(e)}
				>
					Medium
				</button>
				<button
					className={clsxm(
						"font-bold",
						limit === 50 && "text-red-500"
					)}
					value={50}
					onClick={(e) => handleClick(e)}
				>
					Big
				</button>
			</div>
			{data &&
				data.slice(0, limit).map((artist) => (
					<p
						key={artist.name}
						className={clsxm(
							"font-extrabold",
							artist.text_size === "small" && "text-xl",
							artist.text_size === "medium" && "text-2xl",
							artist.text_size === "large" && "text-4xl",
							artist.text_size === "xlarge" && "text-5xl"
						)}
					>
						{artist.name}
					</p>
				))}
		</main>
	);
};

export default Lineup;
