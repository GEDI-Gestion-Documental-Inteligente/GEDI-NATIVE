import { StyleSheet, View } from "react-native"
import { SitesList } from "../components/sites/SitesList"


export const SitesListScreen = ()=>{
    return (
        <View style={styles.container}>
            <SitesList/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})