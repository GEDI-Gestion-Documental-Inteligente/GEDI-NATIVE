import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios' // Importa axios
import { IPV4_ADDRESS } from '../redux/services/SitesThunks'
import { useSelector } from 'react-redux'


export const ChildrenComponent = ({ route }) => {
  const { id } = route.params
  const ticket = useSelector(state => state.auth.ticket)
  const [childNodes, setChildNodes] = useState([])
  const navigation = useNavigation()

  const fetchChildNodes = async (id) => {
    const myheaders = {
      headers: {
        Authorization: 'Basic ' + ticket
      }
    }

    try {
      const response = await axios.get(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
        myheaders
      )
      const filteredNodes = response.data.list.entries.filter(
        (node) => node.entry.name === 'documentLibrary'
      )
      return filteredNodes
    } catch (error) {
      console.error('Error fetching child nodes:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const nodes = await fetchChildNodes(id, ticket)
      setChildNodes(nodes)
    }
    fetchData()
  }, [id, ticket])

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('Carpetas', {
          ticket,
          id: item.entry.id
        })}
    >
      <Text>{item.entry.name}</Text>
    </Pressable>
  )

  return (
    <View>
      {childNodes.length > 0 ? (
        <FlatList
        
          data={childNodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.entry.id}
        />
      ) : (
        <Text>No hay carpetas hijas.</Text>
      )}
    </View>
  )
}
