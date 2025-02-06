const SubmitButton = ({text}) => {
    return (
        <button
            type="submit"
            className={`px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600`}
        >
            {text || "Submit"}
        </button>
    );
}

export default SubmitButton;