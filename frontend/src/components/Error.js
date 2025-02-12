const Error = ({error}) => {
    console.log(error)
    return (
        <div>
            <p className='text-red-500 text-md'>Error: {error}</p>
        </div>
    )
}

export default Error;