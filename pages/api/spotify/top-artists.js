import { getUsersTopItems } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { determineTextSize } from "../../../lib/spotify";

const TYPE = "artists";

function lineUp(data) {
	let dayOne,
		dayTwo,
		dayThree = [];

	for (i = 0; i < data.length; i++) {}
}

const handler = async (req, res) => {
	console.log(req.query);
	const { limit, time_range } = req.query;
	const {
		token: { accessToken },
	} = await getSession({ req });
	const response = await getUsersTopItems(
		accessToken,
		TYPE,
		limit,
		time_range
	);
	const { items } = await response.json();
	const artists = items.map(({ name, popularity, genres }, index) => {
		return {
			name,
			popularity,
			text_size: determineTextSize(popularity),
			index,
			genres,
		};
	});

	return res.status(200).json(artists);
};

export default handler;
