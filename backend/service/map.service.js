const axios = require('axios')

module.exports.getAddressCoordinates = async (address) =>{
    try {
        const apiKey = process.env.GO_MAPS_API_KEY;
        const response = await axios.get('https://maps.gomaps.pro/maps/api/geocode/json', {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data && response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return location;
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}
module.exports.getDistanceInfo = async (origin, destination) =>{
    try {
        const apiKey = process.env.GO_MAPS_API_KEY;
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`);
         
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found')
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time')
        }

      } catch (error) {
        console.error('Error fetching distance info:', error);
        throw error;
    }
}

module.exports.getSuggestions = async (input) =>{
    try {   
        const apiKey = process.env.GO_MAPS_API_KEY;
        const response = await axios.get('https://maps.gomaps.pro/maps/api/place/autocomplete/json', {
            params: {
            input: input,
            key: apiKey
        }
    });
        return response.data.predictions;
    } catch (error) {
        console.error('Error fetching suggest:', error.message);
        throw error;
    }
}
