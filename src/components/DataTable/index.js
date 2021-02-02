import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { Table } from "antd"

import { FahrToCels } from "utils/converter"

const DataTable = ({ forecast }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "dt_txt",
      key: "dt_txt",
      render: (item) => moment(item).format("MMM DD, YY HH:mm"),
    },
    {
      title: "Temp",
      dataIndex: "main",
      key: "main",
      render: (item) => FahrToCels(item.temp),
    },
    {
      title: "Min Temp",
      dataIndex: "main",
      key: "main",
      render: (item) => item.temp_min,
    },
    {
      title: "Max Temp",
      dataIndex: "main",
      key: "main",
      render: (item) => item.temp_max,
    },
    {
      title: "Wind",
      dataIndex: "wind",
      key: "wind",
      render: (item) => `${item.speed} m/sec`,
    },
    {
      title: "Description",
      dataIndex: "weather",
      key: "weather",
      render: (item) => item[0].description,
    },
  ]

  return (
    <Table
      className="forecast_table"
      columns={columns}
      dataSource={forecast}
      rowKey="dt"
      pagination={false}
    />
  )
}

DataTable.propTypes = {
  forecast: PropTypes.array,
}

export default DataTable
