const formatLiters = (newLiters: string) :number => {
    const formattedLitters = (Number(newLiters)/1000).toFixed(2)
    return Number(formattedLitters)
}

const conditionalLiters = (currentLiters: number, maxLiters:number) => {
    const maxLts = formatLiters(maxLiters.toString())
    const descountByTank = maxLiters === 80000 ? 2400 : 1200
    const currentLts = formatLiters((currentLiters - descountByTank).toString())

    if(currentLts < 0) return 0
    if(currentLts > maxLts) return maxLts
    
    return currentLts
}

const pathByLiters = (maxLiters: number) => {
    let tankPath = "";
    if (maxLiters === 40000) tankPath = "comunTank";
    if (maxLiters === 80000) tankPath = "infiniaTank";
    if (maxLiters === 15000) tankPath = "ureaTank";

    return tankPath
}

export {
    formatLiters,
    conditionalLiters,
    pathByLiters
}