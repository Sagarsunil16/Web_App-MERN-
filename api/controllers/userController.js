export const test = async(req,res)=>{
    try {
        res.json({
            message:"Api is Working"
        })
    } catch (error) {
        console.log(error)
    }
}