const axios = require("axios");

const { API_KEY } = process.env;

async function geocodeAddress(address) {

    const response = await axios.get(
        "https://api.olamaps.io/places/v1/geocode",
        {
            params: { address },
            headers: {
                "X-API-Key": API_KEY
            }
        }
    );

    const loc = response.data.geocodingResults[0];

    return {
        lat: loc.geometry.location.lat,
        lng: loc.geometry.location.lng
    };
}

exports.getDistances = async (req, res) => {

    try {

        const origin = await geocodeAddress(
            req.body.fromAddress
        );

        const destination = await geocodeAddress(
            req.body.toAddress
        );

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.olamaps.io/routing/v1/distanceMatrix?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&mode=driving&api_key=${API_KEY}`
        };

        // FIXED
        const response = await axios.request(config);

        console.log(response.data);

        const element =
            response.data.rows[0].elements[0];

        const distance = element.distance;

        const duration = element.duration;

        res.json({
            success: true,
            distanceInMeters: distance,
            distanceInKm: (distance / 1000).toFixed(2),
            durationInSeconds: duration,
            durationInHours: (duration / 3600).toFixed(2)
        });

    } catch (error) {

        console.log(error.response?.data);

        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });

    }

};