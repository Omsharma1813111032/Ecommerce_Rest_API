
// notfound

const notFound = (req,res,next) =>{
    const err = new Error(`Not Found : ${req.orignalUrl} `);
    res.status(404)
    next()
}

// error hadnler for apis
const errorHandler = (req,res,next ) =>{
    const statuscode = res.statusCode===200 ? 500: res.statusCode;
    req.status(statuscode).json({message:err?.message})
}

module.exports = {errorHandler,notFound}