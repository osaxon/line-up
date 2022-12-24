import clsxm from "../lib/clsxm";
import useAppState from "../store/state";

const SceneButton = ({ scene }) => {
	const { currentScene, setScene } = useAppState((state) => ({
		currentScene: state.currentScene,
		setScene: state.setScene,
	}));
	const handleStyle = (e) => {
		e.preventDefault();
		setScene(e.target.value);
	};
	return (
		<button
			className={clsxm(
				"btn btn-sm",
				currentScene === scene && "btn-disabled"
			)}
			value={scene}
			onClick={(e) => handleStyle(e)}
		>
			{scene}
		</button>
	);
};

export default SceneButton;
