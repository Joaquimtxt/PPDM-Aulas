import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { createStyles } from 'react-native-buildstrap'
import {Carousel} from "react-native-buildstrap/src/components/Carousel"

export function SensorDHTScreen(){
  const styles=createStyles();

  const data =[
    {
      image:"https://picsum.photos/800/400",
      title:"Sensores",
      description:"descritivo"
    },
    {
      image: "https://picsum.photos/800/400?random=2", 
      title: "Temperatura",
      description: "outro descritivo"
    }
  ]
  return (
<View style={[styles.container]}>
<Carousel data={data} autoPlay interval={3000}/>
</View>
  )
}
