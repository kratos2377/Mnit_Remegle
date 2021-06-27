import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDeleteSpaceMutation } from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";

export const DeletingSpace = ({
  navigation,
  route,
}: MainNavProps<"DeletingSpace">) => {
  const [snackVisible, setSnackVisible] = useState(false);
  const [display, setDisplay] = useState<"Post" | "User">("Post");
  const [spaceDeleteLoadingError, setSpaceDeleteLoadingError] = useState(false);
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [userId, setUserId] = useState("");
  const [deleteSpace] = useDeleteSpaceMutation();

  const deleteSpaceHandler = async () => {
    
    route?.params.spaceFn(route.params.spaceId)


    const response = await deleteSpace({
      variables: {
        spaceId: route?.params?.spaceId,
      },
      update: (cache) => {
        cache.evict({ id: "Spaces:" + route?.params?.spaceId });
      },
    });

    if (!response.data?.deleteSpace?.boolResult?.value) {
    }

     navigation.pop()
  };

  useEffect(() => {
    deleteSpaceHandler();
  }, []);

  return (
    <View style={{ flexDirection: "column", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};
