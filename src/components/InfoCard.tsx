

function InfoCard() {
    return (
        <div className="max-w-[25rem] w-[90%] rounded-2xl bg-[#31363F] h-fit mt-4 p-4 flex flex-col items-center">
            <p className="text-white text-center">This website uses unemployment, interest and inflation data from the ABS dating back to 1991. PyTorch is used to forecast unemployment based on the given inflation and interest rates</p>

        </div>
    )
}

export default InfoCard;