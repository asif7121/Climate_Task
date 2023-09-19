import requestValidator from "../../helper/validator.js";
import { valid } from "../../schema.js";
import Climate from "./climate.model.js";

export default {
  // create a new climate data

  newClimateData: async (req, res) => {
    const error = requestValidator( valid, req.body )
    if ( error ) {
      return res.send({error})
    }
    
    const { climate, area_code, temperature, humidity, chances_of_rain } = req.body;

    let newData = await Climate.create({
      climate,
      area_code,
      temperature,
      humidity,
      chances_of_rain,
    });
    newData = await newData.save();
   
    return res
      .status(201)
      .send({ success: true, data: { id: newData._id }, error: null });
  },

  // fetching all records of climate

  getAllRecords: async (req, res) => {
    const allRecords = await Climate.find();
    return res.status(200).send({ success: true, data: allRecords });
  },

  // fetching climate records by area code

  areaRecords: async ( req, res ) => {
     
    const { area_code } = req.body;
    const data = await Climate.find({ area_code });

    if (data.length === 0 ) {
      return res.status(404).send({
        success: false,
        message: "No data found with the given area code",
      });
    }
    return res.status(200).send({ success: true, data: data });
  },

  // fetching records of particular climate of a particular area

  p_areaAndp_climate: async (req, res) => {
    const { climate, area_code } = req.body;

    const data = await Climate.find({ climate, area_code });

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found with the given area code or climate",
      });
    }

    return res.status(200).send({ success: true, data: data });
  },

  // changing climate of a certain area code
  getClimateChangeIndex: async (req, res) => {
    const { from_climate, to_climate, area_code } = req.body;

    const filter = {
      area_code,
      $or: [{ climate: from_climate }, { climate: to_climate }],
    };
    const data = await Climate.find(filter);

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message:
          "No data found with the given area code and climate conditions",
      });
    }
    let sumFromTemp = 0;
    let sumToTemp = 0;
    let humidityFromSum = 0;
    let humidityToSum = 0;
    let rainChancesFromSum = 0;
    let rainChancesToSum = 0;

    for (const ele of data) {
      if (ele?.climate === from_climate) {
        sumFromTemp += ele?.temperature;
        humidityFromSum += ele?.humidity;
        rainChancesFromSum += ele?.chances_of_rain;
      }
      if (ele?.climate === to_climate) {
        sumToTemp += ele?.temperature;
        humidityToSum += ele?.humidity;
        rainChancesToSum += ele?.chances_of_rain;
      }
    }
    const temperature_delta = (sumToTemp - sumFromTemp) / data.length;
    const humidity_delta = (humidityToSum - humidityFromSum) / data.length;
    const rain_chances_delta =
      (rainChancesToSum - rainChancesFromSum) / data.length;
    const response = {
      climate_delta: `${from_climate} -> ${to_climate}`,
      temperature_delta,
      humidity_delta,
      rain_chances_delta,
      climate_change_index:
        (temperature_delta * humidity_delta) / rain_chances_delta,
    };

    return res.status(200).send({ success: true, data: response });
  },
};
