/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query"
import { Link, SplashScreen, router } from "expo-router"
import { DateTime } from "luxon"
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native"
import { getDeliveries } from "@/api/delivery"
import { Feather, Ionicons } from "@expo/vector-icons"

function DeliveryItem(props: {
  id: number
  createdAt: string
  packageCount: number
}) {
  return (
    <View style={[styles.statsCard]}>
      <View style={styles.packageTitle}>
        <Text style={styles.packageNumber}>{props.id}</Text>
        <Text style={styles.truckNumber}>TRUCK 1</Text>
      </View>
      <View style={[styles.miniCard]}>
        <TouchableOpacity>
          <Feather name="navigation" style={styles.navIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.packageDetailsContainer}>
        <Feather name="package" style={styles.packageIcon} />
        <View style={styles.packageContainer}>
          <View style={styles.packageDetails}>
            <Ionicons name="newspaper-outline" style={styles.miniIcon} />
            <Text style={styles.miniIconDescription}>{props.createdAt}</Text>
          </View>
          {/* TODO: Replace these with more useful info. */}
          {/* <View style={styles.packageDetails}>
            <Feather name="map-pin" style={styles.miniIcon} />
            <Text style={styles.miniIconDescription}>UAE Hub - Main Hub</Text>
          </View> */}
          {/* <View style={styles.packageDetails}>
            <Feather name="calendar" style={styles.miniIcon} />
            <Text style={styles.miniIconDescription}>
              6th April - 10th April
            </Text>
          </View> */}
          <View style={styles.packageDetails}>
            <Feather name="package" style={styles.miniIcon} />
            <Text style={styles.miniIconDescription}>{props.packageCount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function DeliveriesPage() {
  const { status, data, error } = useQuery({
    queryKey: ["getDeliveries"],
    queryFn: () => getDeliveries(),
  })

  return (
    <View
      style={styles.mainScreen}
      onLayout={() => {
        SplashScreen.hideAsync()
      }}
    >
      <View style={styles.headerSection}>
        <Link
          href="/(app)/driver/dashboard"
          style={{
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={27}
            color="#F8F8F8"
            activeOpacity={0.6}
          />
        </Link>
        <Text style={styles.headerTitle}>Deliveries</Text>
      </View>

      <ScrollView>
        {status === "pending" && <Text>Loading ...</Text>}
        {status === "error" && <Text>Error {error.message}</Text>}
        {status === "success" && (
          <View style={[styles.deliveryTruckTile]}>
            {data.deliveries.length === 0 ? (
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                No deliveries assigned.
              </Text>
            ) : (
              <>
                {data.deliveries.map((delivery) => (
                  <TouchableOpacity
                    key={delivery.id}
                    onPress={() =>
                      router.push({
                        pathname: "/(app)/driver/deliveries/[id]/",
                        params: {
                          id: delivery.id,
                        },
                      })
                    }
                    activeOpacity={0.6}
                  >
                    {/* TODO: Replace hardcoded values with correc info. */}
                    <DeliveryItem
                      id={delivery.id}
                      packageCount={5}
                      createdAt={DateTime.fromISO(
                        delivery.createdAt,
                      ).toLocaleString(DateTime.DATETIME_SHORT)}
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DEDBDB",
  },
  headerSection: {
    backgroundColor: "#79CFDC",
    paddingBottom: 12,
    paddingTop: 45,
    elevation: 20,
    shadowColor: "#000000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#F8F8F8",
    bottom: 2,
  },
  headerIconMenu: {
    marginRight: 15,
  },
  deliveryTruckTile: {
    padding: 10,
    marginTop: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  statsCard: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    height: 180,
    borderRadius: 20,
    paddingLeft: 10,
  },
  miniCard: {
    backgroundColor: "#78CFDC",
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    width: 90,
  },
  miniIconDescription: {
    marginLeft: 10,
    color: "black",
    fontSize: 15,
    top: 15,
  },
  packageIcon: {
    fontSize: 100,
    marginLeft: 10,
    top: 20,
    color: "#78CFDC",
    height: "100%",
  },
  optionSection: {
    paddingVertical: 10,
  },
  optionBtn: {
    borderRadius: 15,
    paddingVertical: 13,
    marginBottom: 20,
    backgroundColor: "#DF5555",
  },
  optionBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },

  bottomSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  packageNumber: {
    color: "black",
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "roboto",
  },

  truckNumber: {
    color: "#78CFDC",
    marginLeft: "auto",
    paddingHorizontal: 12,
    fontSize: 20,
    fontWeight: "normal",
    backgroundColor: "#F0F0F0",
    borderRadius: 100,
    padding: 1,
  },
  packageTitle: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  packageDetails: {
    flexDirection: "row",
    marginHorizontal: 5,
    elevation: 20,
  },
  packageDetailsContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    elevation: 20,
  },
  miniIcon: {
    color: "#78CFDC",
    fontSize: 20,
    top: 15,
  },
  packageContainer: {
    flexDirection: "column",
    marginHorizontal: 5,
    gap: 6,
  },
  navIcon: {
    fontSize: 30,
    color: "#FFFFFF",
    marginLeft: 20,
    transform: [{ scaleX: -1 }],
  },
})
