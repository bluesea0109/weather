import React from "react"
import PropTypes from "prop-types"

import { Typography } from "antd"

import { FahrToCels } from "utils/converter"

const { Paragraph } = Typography

const Today = ({ todayWeather }) => {
  const { weather, wind, main } = todayWeather

  return (
    <div className="today-weather">
      <Paragraph>
        <div className="today-weather-temp color-main">
          {FahrToCels(main.temp)}
          <sup>
            <span className="temp-symbol">&#8451;</span>
          </sup>
        </div>
        <div className="today-weather-desc color-desc">{weather[0].main}</div>
        <div className="today-weather-detail color-desc">
          {weather[0].description}
        </div>
        <div className="today-weather-desc color-desc">Wind</div>
        <div className="today-weather-detail color-desc">
          {wind.speed} m/sec
        </div>
      </Paragraph>
    </div>
  )
}

Today.propTypes = {
  todayWeather: PropTypes.object,
}

export default Today
