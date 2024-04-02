import React from "react";
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import HomeIcon from "../assets/home.svg";
import SearchIcon from "../assets/search.svg";
import TodayIcon from "../assets/today.svg";
import FavoriteIcon from "../assets/favorite.svg";
import AccountIcon from "../assets/account.svg";

const TabArea = styled.View`
  height: 60px;
  background-color: #303233;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  elevation: 10;
`;

const TabButton = styled.TouchableOpacity``;

const TabIcon = styled.View`
  width: ${({ active }) => (active ? "60px" : "24px")};;
  height: ${({ active }) => (active ? "60px" : "24px")};;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "#FEC200" : "transparent")};
  border-radius: ${({ active }) => (active ? "30px" : "0px")};
  top:  ${({ active }) => (active ? "-20px" : "0px")};
`;

export default ({ state, navigation }) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabButton onPress={() => goTo("Home")}>
        <TabIcon active={state.index === 0}>
          <HomeIcon width="24" height="24"  fill={(state.index === 0? "#FFF" : "#FEC200")} />
        </TabIcon>
      </TabButton>
      <TabButton onPress={() => goTo("Search")}>
        <TabIcon active={state.index === 1}>
          <SearchIcon width="24" height="24" fill={(state.index === 1? "#FFF" : "#FEC200")} />
        </TabIcon>
      </TabButton>
      <TabButton onPress={() => goTo("Appointments")}>
        <TabIcon active={state.index === 2}>
          <TodayIcon width="24" height="24" fill={(state.index === 2? "#FFF" : "#FEC200")} />
        </TabIcon>
      </TabButton>
      <TabButton onPress={() => goTo("Favorites")}>
        <TabIcon active={state.index === 3}>
          <FavoriteIcon width="24" height="24" fill={(state.index === 3? "#FFF" : "#FEC200")} />
        </TabIcon>
      </TabButton>
      <TabButton onPress={() => goTo("Profile")}>
        <TabIcon active={state.index === 4}>
          <AccountIcon width="24" height="24" fill={(state.index === 4? "#FFF" : "#FEC200")} />
        </TabIcon>
      </TabButton>
    </TabArea>
  );
};
