import { getUsersTopItems } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { determineTextSize } from "../../../lib/spotify";

const TYPE = "artists";

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
	const artists = items.map(({ name, popularity }, index) => {
		return {
			name,
			popularity,
			text_size: determineTextSize(popularity),
			index,
		};
	});

	return res.status(200).json(artists);
};

export default handler;
