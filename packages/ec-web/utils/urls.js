export const API_URL = process.env.NEX_PIBLIC_API_URL || 'http://localhost:1337';

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_live_A44120DCF379E76A'
/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image 
 */
export const fromImageToURL = (image) => {
    if(!image){
        return "/vercel.svg"
    }
    // If '/' is a first character => That means relative path
    if(image.url.indexOf("/") === 0){
        
        return `${API_URL}${image.url}`
 
    }
    return image.url;
}