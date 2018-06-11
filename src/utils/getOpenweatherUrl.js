import { OPENWEATHER_KEY } from 'store/constants';

export default (latitude, longitude) => `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&
lon=${longitude}&APPID=${OPENWEATHER_KEY}&units=metric`;
