import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { deleteData, db } from "../firebase";
import { editIcon, deleteIcon } from "../Images";
const ref = db.collection("todoList");
export default (HomeScreen = ({ navigation }) => {
  let [data, setData] = useState([]);
  let [extraData, setExtraData] = useState(null);
  let [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    try {
      ref.onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          if (doc && doc.exists) {
            list.push(doc.data());
          }
        });
        setData(list);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDataM = async ({ id }) => {
    setLoading(true);
    await deleteData({ table: "todoList", id });
    setLoading(false);
    setExtraData(id);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}

      {data && data?.length ? (
        <>
          <FlatList
            data={data}
            extraData={extraData}
            renderItem={({ item }) => {
              return (
                <View style={styles.renderContainer}>
                  <View style={styles.renderBoxTextStyle}>
                    <Text numberOfLines={1}>{item?.text}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("AddScreen", {
                        ...item,
                        name: "Edit Screen",
                      });
                    }}
                  >
                    <Image source={editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => deleteDataM(item)}
                  >
                    <Image source={deleteIcon} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("AddScreen", { name: "Add Screen" });
              }}
            >
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 20,
  },
  loaderStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  renderBoxTextStyle: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    paddingVertical: 5,
    flex: 1,
  },
  renderContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  buttonContainer: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
});
