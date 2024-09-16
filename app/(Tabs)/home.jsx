import { View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import Features from '../../components/Features'
import Sample from '../../components/Sample'

const Home = () => {
  return (
    <ScrollView style={{
      color: '#DCDCDC'
    }}>
        <Header/>
        <Slider/>
        <Features/>
        <Sample/>
    </ScrollView>

  )
}

export default Home