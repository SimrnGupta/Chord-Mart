const { Brand } = require('../models/brand');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const addBrand = async(brandname) => {
    try {
        const brand = new Brand({
            name: brandname
        });
        await brand.save();
        return brand;
    } catch(err) {
        throw err;
    }
}

const getBrandById = async(id) => {
    try {
        const brand = await Brand.findById(id);
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found!");
        return brand;
    } catch(err) {
        throw err;
    }
}

const deleteBrandById = async(id) => {
    try {
        const brand = await Brand.findByIdAndRemove(id);
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found!");
        return brand;
    } catch(err) {
        throw err;
    }
}

const getBrands = async(args) =>{
    try{
        let order = args.order ? args.order : "asc";
        let limit = args.limit ? args.limit : 5;
        const brands = await Brand
        .find({})
        .sort([
            ["_id", order]
        ])
        .limit(limit);
        if(!brands) throw new ApiError(httpStatus.NOT_FOUND, "Brands not found!");
        return brands;


        
    } catch(error){
        throw error;
    }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getBrands
}