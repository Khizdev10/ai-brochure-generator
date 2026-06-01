const Stats = () => {
    return (
        <div className="bg-black text-white m-4 sm:m-8 md:m-20 rounded-4xl p-8 md:p-10 flex flex-wrap items-center justify-around gap-8">
            <div className="flex-1 flex flex-col items-center min-w-[200px]">
                <h1 className="text-3xl font-bold">10k + </h1>
                <p className="text-lg">Happy Users</p>
            </div>
            <div className="flex-1 flex flex-col items-center min-w-[200px]">
                <h1 className="text-3xl font-bold">98%</h1>
                <p className="text-lg">Customer Satisfaction</p>
            </div>
            <div className="flex-1 flex flex-col items-center min-w-[200px]">
                <h1 className="text-3xl font-bold">85%</h1>
                <p className="text-lg">Cost Reduction</p>
            </div>
        </div>
    )
}
export default Stats