const links = [
    {
        name: "Portfolio",
        url: "https://lliamsymonds04.github.io/",
        imgSrc: "https://img.icons8.com/?size=100&id=RMOSvUQ2lycM&format=png&color=FFFFFF"
    },
    {
        name: "Github",
        url: "https://github.com/lliamsymonds04",
        imgSrc: "https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF"
    },
    {
        name: "Github Repo",
        url: "https://github.com/lliamsymonds04/forecasting-unemployment",
        imgSrc: "https://img.icons8.com/?size=100&id=9QcispT98adO&format=png&color=FFFFFF"
    }
    
]

function LinkButton({imgSrc, link, size = 10, name}: {imgSrc: string, link: string, name: string, size?: number}) {
    return (
        <a href={link} target="_blank" rel="noreferrer" title={name}>
            <img src={imgSrc} style={{height: `${size/4}rem`, width: `${size/4}rem`}} /> 
        </a>
    )
}

function LinksCard() {
    return (
        <div className="max-w-[15rem] w-[50%] rounded-2xl bg-[#31363F] h-fit mt-4 gap-2 p-2 flex flex-col items-center justify-center">
            <p className="font-bold text-white text-2xl">Links</p>
            <div className="flex flex-row items-center justify-center gap-2">
                {links.map((v, index) => <LinkButton imgSrc={v.imgSrc} link={v.url} name={v.name} key={index} size={10}/>)}
            </div>

        </div>
    )
}

export default LinksCard;