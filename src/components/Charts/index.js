import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Line } from "@ant-design/charts"
import moment from "moment"

const Charts = ({ forecast }) => {
  const data = useMemo(() => {
    if (!forecast) {
      return []
    }

    let currentData = []

    forecast.forEach((item) => {
      for (const [key, value] of Object.entries(item.main)) {
        currentData.push({
          time: moment(item.dt_txt).format("HH:mm"),
          category: key,
          value: value,
        })
      }
    })

    return currentData
  }, [forecast])

  const config = {
    data: data,
    xField: "time",
    yField: "value",
    seriesField: "category",
    style: {
      height: 400,
    },
  }

  return <Line {...config} />
}

Charts.propTypes = {
  forecast: PropTypes.array,
}

export default Charts
