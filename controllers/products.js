const Product=require("../models/product");


const getAllProducts=async(req,res)=>{
    // throw new Error("testing error package")
    const {featured,company,name,sort,select,numericFilters}=req.query;
    console.log(req.query)
    const queryObject={};
    //filter
    if(featured){
       queryObject.featured=(featured==='true')?true:false
    }
    if(company){
        queryObject.company=company
    }
    if(name){
        queryObject.name={$regex:name,$options:'i'}
    }
    //numericFilters
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx=/\b(>|<|=|>=|<=)\b/g;
        let filter=numericFilters.replace(regEx,(match)=>{return `-${operatorMap[match]}-`})
        const options=['price','rating'];
        filter=filter.split(",").forEach((item)=>{
            const[field,op,val]=item.split('-');
            if(options.includes(field)){
                queryObject[field]={[op]:Number(val)}
            }
        });
        console.log(filter);
    }

    console.log(queryObject);
    let result= Product.find(queryObject)
    //sort
if(sort){
    result=result.sort(sort.split(",").join(" "))
}
else{
    result=result.sort('createdAt')
}
//fields
if(select){
    result=result.select(select.split(",").join(" "))
}
//pagination
const page=Number(req.query.page)||1;
const limit=Number(req.query.limit)||10;
const skip=(page-1)*limit;
result=result.limit(limit).skip(skip);
    const products= await result
 res.status(200).json({products,nbHits:products.length})
}

const getAllProductsStatic=async(req,res)=>{

    const products= await Product.find().sort('name');
 res.status(200).json({products,nbHits:products.length})
}


module.exports={getAllProducts,getAllProductsStatic};