import React from 'react'
import bikestation from '../images/bike_image.jpg'

const Homeview = () => {
  const style = {
    padding: 7,
  }
  const fontSize = {
    fontSize: 13,
  }

  return (
    <div style={style}>
      <h2> Helsinki city bike app </h2>
      <img src={bikestation} width={400} height={550} alt="bike station" />
      <br />
      <i style={fontSize}>Copyright Creative Commons</i>
      <div>
        <b>
          In this app you can view the list of city bike stations in Helsinki
          and Espoo.
          <br />
          You can search a station by name and click one to get additional
          information regarding that station.
          <br />
          There is also a list of journeys represented as a data table.
        </b>
      </div>
    </div>
  )
}

export default Homeview
