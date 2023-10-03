import { StyleSheet, Text, View } from "react-native"

export const TabChat = ()=>{
    return(
        <View style={styles.TabChat}>
            <Text style={styles.textTab}>Alfredo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    TabChat: {
       display: "flex",
       alignItems: "center",
       height: "5vh",
       backgroundColor: "#4D6F5F",
    },
    textTab:{
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold"
    }
})