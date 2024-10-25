import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons"; // Asegúrate de tener importado Entypo
import Map from "../components/Map"; // Ajusta la ruta según la ubicación de tu componente de mapa
import colors from "../colors"; // Asegúrate de tener el archivo de colores

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Map />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Entypo name="chat" size={24} color={colors.lightGray} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mapContainer: {
        flex: 1, // Esto hace que el mapa ocupe todo el espacio disponible
        justifyContent: 'flex-start', // Centra el contenido verticalmente
        alignItems: 'center', // Centra horizontalmente
        marginTop: 20, // Puedes ajustar 
    },
    buttonContainer: {
        flexDirection: 'row', // Alinea los botones en una fila
        justifyContent: 'flex-end', // Alinea los botones a la derecha
        alignItems: 'flex-end', // Alinea los botones en la parte inferior
        marginBottom: 50, // Espacio en la parte inferior
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        marginRight: 20,
    }
});
