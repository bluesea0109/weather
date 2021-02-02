import React, { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"

import { todayWeatherRequest, forecastRequest } from "modules/weather/actions"
import { selectTodayWeather, selectForecast } from "modules/weather/selectors"

import { Today, DataTable, Charts } from "components"
import { cityOptions } from "constant"

import { Button, Layout, PageHeader, Select, Tabs, Typography } from "antd"

const { Option } = Select
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs

const Weather = () => {
  const dispatch = useDispatch()
  const [currentCityId, setCurrentCityId] = useState(null)
  const [currentDate, setCurrentDate] = useState()
  const [active, setActive] = useState(true)
  const [activeSideBar, setActiveSideBar] = useState(true)
  const todayWeather = useSelector(selectTodayWeather)
  const forecast = useSelector(selectForecast)

  useEffect(() => {
    if (currentCityId !== null && currentCityId !== undefined) {
      dispatch(todayWeatherRequest({ currentCityId }))
    }
  }, [dispatch, currentCityId])

  const dates = useMemo(() => {
    if (!forecast) {
      return []
    }

    let uniqueDates = forecast.reduce(function (allDates, element) {
      const date_text = moment(element.dt_txt).format("YYYY-MM-DD")
      if (allDates.indexOf(date_text) === -1) {
        allDates.push(date_text)
      }

      return allDates
    }, [])

    setCurrentDate(uniqueDates[0])
    return uniqueDates
  }, [forecast])

  const currentDateForecast = useMemo(() => {
    if (!forecast) {
      return []
    }
    const currentFilterDate = forecast.filter((item) => {
      return moment(item.dt_txt).format("YYYY-MM-DD") === currentDate
    })

    return currentFilterDate
  }, [currentDate, forecast])

  const handleChange = (value) => {
    setCurrentCityId(value)

    setActiveSideBar(value !== undefined ? true : false)
    setActive(true)
  }

  const fetchData = () => {
    dispatch(forecastRequest({ currentCityId }))
    setActive(false)
  }

  const handleTabs = (key) => {
    console.log(key)
  }

  const handleFilter = (date) => {
    setCurrentDate(date)
  }

  return (
    <>
      <Layout className="site-layout">
        <Sider width={350} className="site-sider">
          <div className="site-side-weather">
            <div className="site-side-title color-main">Today</div>
            <div className="site-side-date color-desc">
              {moment().format("MMM DD, YY")}
            </div>
            {todayWeather && activeSideBar && (
              <div className="site-side-content">
                <Today todayWeather={todayWeather} />
                {active ? (
                  <Button type="primary" shape="round" onClick={fetchData}>
                    SEE FORECAST
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => setActive(true)}
                  >
                    CLOSE
                  </Button>
                )}
              </div>
            )}
          </div>
        </Sider>
        <Layout>
          <Content className="site-content">
            <PageHeader className="site-header" title="Weather forecast" />
            <div className="site-content-body">
              <div className="site-content-search">
                <Select
                  showSearch
                  placeholder="City"
                  style={{ width: 150 }}
                  onChange={handleChange}
                  bordered={false}
                  filterOption={(input, option) =>
                    typeof option.children === "string"
                      ? option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      : ""
                  }
                  allowClear
                >
                  {cityOptions.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {`${city.name}, ${city.country}`}
                    </Option>
                  ))}
                </Select>
                <Typography className="select-text">
                  Select the city, please.
                </Typography>
              </div>

              {dates.length && !active && activeSideBar
                ? dates.map((date) => (
                    <Button
                      className={`filter-btn ${
                        currentDate === date ? "active-btn" : ""
                      }`}
                      key={date}
                      onClick={() => handleFilter(date)}
                    >
                      {moment(date).format("MMM DD, YY")}
                    </Button>
                  ))
                : null}

              {forecast && forecast.length > 0 && !active && activeSideBar && (
                <Tabs defaultActiveKey="1" onChange={handleTabs}>
                  <TabPane tab="Graphics" key="1">
                    <Charts forecast={currentDateForecast} />
                  </TabPane>
                  <TabPane tab="Table" key="2">
                    <DataTable
                      className="site-content-forecast"
                      forecast={currentDateForecast}
                    />
                  </TabPane>
                </Tabs>
              )}
            </div>
          </Content>
          <Footer>Weather Forecast App by Dennis @2021 </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default Weather
