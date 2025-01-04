const mapServices = require('../service/map.service')
const { validationResult } = require('express-validator')


const getCordinates = async (req, res) =>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
   }

   const { address} = req.query
   
   try {
    const cordinates = await mapServices.getAddressCoordinates(address)
    res.status(200).json({ cordinates })
   } catch (error) {
    res.status(404).json({ message: 'Error fetching cordinates:', error })
   }
}

const getDistanceInfo = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
     return res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination } = req.query
    try {
        const distanceInfo = await mapServices.getDistanceInfo(origin, destination)
        const distance = distanceInfo.rows[0].elements[0].distance.text 
        const duration = distanceInfo.rows[0].elements[0].duration.text
        res.status(200).json({ distance, duration })
    } catch (error) {
        res.status(404).json({ message: 'Error fetching distance info:', error })
    }
}

const getSuggestions = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
     return res.status(400).json({ errors: errors.array() })
    }

    const { input } = req.query
    try {
        const suggestions = await mapServices.getSuggestions(input)
        res.status(200).json({ suggestions })
    } catch (error) {
        res.status(404).json({ message: 'Error fetching suggestions:', error })
    }
}

module.exports = { getCordinates, getDistanceInfo, getSuggestions }