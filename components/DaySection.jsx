import clsxm from "../lib/clsxm";

const DaySection = ({ dayData, font, className }) => {
	if (!dayData) return null;
	return (
		<div className={clsxm("bg-opacity-10 py-4", className, font.className)}>
			<h3 className="text-3xl">{dayData[0]?.name}</h3>
			<ul className="flex flex-wrap max-w-full px-20 items-center mx-auto justify-center flex-grow-0">
				{dayData &&
					dayData.slice(1, 50).map((artist, i) => (
						<li className={clsxm("p-1 text-lg")} key={artist.name}>
							<h4>{artist.name},</h4>
						</li>
					))}
			</ul>
		</div>
	);
};

export default DaySection;
