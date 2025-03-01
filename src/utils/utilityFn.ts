import dayjs from "dayjs";

export const removeSlugs =(slug:string)=>{
    return slug.replaceAll('-', ' ')
}

export const getDeliveryDate = (uni:number)=>{
    let korra;
    const today = dayjs()
    const futureAgo = today.add(uni, 'day')
    if(futureAgo.format('dddd') == "Sunday"){
        korra = futureAgo.add(1, 'day')
    }else if(futureAgo.format('dddd') == "Saturday"){
        korra = futureAgo.add(2, 'day')
    }else{
        korra = futureAgo
    }
    return korra.toString()
}