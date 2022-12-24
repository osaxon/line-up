import { getUsersTopItems } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { determineTextSize } from "../../../lib/spotify";
import orderBy from "lodash/orderBy";

const TYPE = "artists";

function createLineup(data) {
	let dayOne = [];
	let dayTwo = [];
	let dayThree = [];

	data.forEach(() => {
		dayOne.push(data.pop());
		dayTwo.push(data.pop());
		dayThree.push(data.pop());
	});

	const lineup = {
		dayOne: orderBy(dayOne, ["popularity"], ["desc"]),
		dayTwo: orderBy(dayTwo, ["popularity"], ["desc"]),
		dayThree: orderBy(dayThree, ["popularity"], ["desc"]),
	};

	return lineup;
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
	const lineup = createLineup(artists);
	console.log(lineup.dayOne);

	return res.status(200).json(lineup);
};

export default handler;
