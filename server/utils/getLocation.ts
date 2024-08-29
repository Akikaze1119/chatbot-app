import axios from 'axios';

async function getLocation(): Promise<string | null> {
  const res = await axios.get('http://ip-api.com/json');
  if (res.status === 200) {
    const data = res.data;
    /**
     * It's possible to get more data from the response like region, lat, lon, etc.
     * Also, data type is varchar(255) in the database, so we need to make sure the string is not too long.
     * Check the API documentation: https://ip-api.com/docs/api:json
     */
    return `${data.city}, ${data.country}`;
  }
  return null;
}

export default getLocation;
