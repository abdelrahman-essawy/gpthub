import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    message:string,
    human:boolean
}

const MessageCard = ({}: Props) => {
  return (
    <View>
      <Text>MessageCard</Text>
    </View>
  )
}

export default MessageCard