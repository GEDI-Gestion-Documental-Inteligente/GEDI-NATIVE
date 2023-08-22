import React, { useState, useEffect } from 'react' // Importa React correctamente
import { Text, StyleSheet, View, StatusBar, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { encode } from 'base-64'

export const IPV4_ADDRESS = '192.168.137.1'

export const SiteScreen = () => {
  const navigation = useNavigation()

  const [sites, setSites] = useState([])

  const fetchTicket = async () => {
    const myheaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 'admin', password: '12345' })
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets`,
      myheaders
    )
    const data = await response.json()
    console.log(encode(data.entry.id))

    return encode(data.entry.id)
  }

  const fetchSites = async (ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/sites`,
      myheaders
    )
    const data = await response.json()
    console.log(data.list.entries)
    setSites(data.list.entries)
  }

  useEffect(() => {
    const fetchData = async () => {
      const ticket = await fetchTicket()
      await fetchSites(ticket)
    }

    fetchData()
  }, [])

  return (
    <View>
      {sites?.map((value, index) => (
        <Pressable
          key={index}
          style={styles.site}
          onPress={async () => {
            const ticket = await fetchTicket()
            navigation.navigate('Children', {
              id: value.entry.guid,
              ticket
            })
          }}
        >
          <Text>{value.entry.title}</Text>
          <Text>{value.entry.guid}</Text>
        </Pressable>
      ))}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  site: {
    backgroundColor: '#f3f3f3',
    borderWidth: 1, // Cambia 'border' por 'borderWidth'
    borderColor: 'black', // Cambia 'border' por 'borderColor'
    cursor: 'pointer'
  }
})
