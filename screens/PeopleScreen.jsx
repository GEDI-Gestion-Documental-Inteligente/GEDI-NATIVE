import { StyleSheet, View } from "react-native"
import { PeopleList } from "../components/people/PeopleList"


export const PeopleScreen = ()=>{
    return (
        <View style={styles.container}>
            <PeopleList/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})