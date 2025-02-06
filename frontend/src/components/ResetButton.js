const ResetButton = ({onReset, text}) => {
    return (
        <button
            type="button"
            className={`px-5 py-2 border border-blue-500 rounded-lg text-sm text-blue-500 hover:bg-gray-200  ${text === "Cancel" && "text-red-500 border-red-500"}`}
            onClick={onReset}
        >
            {text || "Reset"}
        </button>
    );
}

export default ResetButton;