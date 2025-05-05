import { Stack, useRouter, Redirect } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import {
  GlobeIcon,
  HomeIcon,
  LucideIcon,
  PersonStandingIcon,
} from "lucide-react-native";
import { cn } from "@gluestack-ui/nativewind-utils/cn/index";
import { Platform } from "react-native";
import { useSession } from "@/components/ctx";

type MobileHeaderProps = {
  title: string;
};

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

type Icons = {
  iconName: LucideIcon | typeof Icon;
  route: "/dashboard/home" | "/dashboard/profile" | "/dashboard/feed";
};
const list: Icons[] = [
  {
    iconName: HomeIcon,
    route: "/dashboard/home",
  },
  {
    iconName: GlobeIcon,
    route: "/dashboard/feed",
  },
];
type BottomTabs = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
  route: string;
};
const bottomTabsList: BottomTabs[] = [
  {
    iconName: HomeIcon,
    iconText: "Home",
    route: "/dashboard/home",
  },
  {
    iconName: GlobeIcon,
    iconText: "Feed",
    route: "/dashboard/feed",
  },
  {
    iconName: PersonStandingIcon,
    iconText: "Profile",
    route: "/dashboard/profile",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    router.push(list[index].route);
  };

  return (
    <VStack
      className="w-14 pt-5 h-full items-center border-r border-border-300"
      space="xl"
    >
      {list.map((item, index) => {
        return (
          <Pressable
            key={index}
            className="hover:bg-background-50"
            onPress={() => handlePress(index)}
          >
            <Icon
              as={item.iconName}
              className={`w-[55px] h-9 stroke-background-800 
              ${index === selectedIndex ? "fill-background-800" : "fill-none"}

              `}
            />
          </Pressable>
        );
      })}
    </VStack>
  );
};

function WebHeader(props: HeaderProps) {
  const router = useRouter();
  return (
    <HStack className="pt-4  pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
      <HStack className="items-center">
        <Pressable
          onPress={() => {
            props.toggleSidebar();
          }}
        >
          <Icon as={MenuIcon} size="lg" className="mx-5" />
        </Pressable>
        <Text className="text-2xl">{props.title}</Text>
      </HStack>

      <Pressable onPress={() => router.push("/dashboard/profile")}>
        <Avatar className="h-9 w-9">
          <AvatarFallbackText className="font-light">A</AvatarFallbackText>
        </Avatar>
      </Pressable>
    </HStack>
  );
}

function MobileHeader(props: MobileHeaderProps) {
  return (
    <HStack
      className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
      space="md"
    >
      <Text className="text-xl">{props.title}</Text>
    </HStack>
  );
}

function MobileFooter({ footerIcons }: { footerIcons: any }) {
  const router = useRouter();
  return (
    <HStack
      className={cn(
        "bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t",
        { "pb-5": Platform.OS === "ios" },
        { "pb-5": Platform.OS === "android" }
      )}
    >
      {footerIcons.map(
        (
          item: {
            iconText: string;
            iconName: any;
            route: "/dashboard/home" | "/dashboard/profile";
          },
          index: React.Key | null | undefined
        ) => {
          return (
            <Pressable
              className="px-0.5 flex-1 flex-col items-center"
              key={index}
              onPress={() => router.push(item.route)}
            >
              <Icon
                as={item.iconName}
                size="md"
                className="h-[32px] w-[65px]"
              />
              <Text className="text-xs text-center text-typography-600">
                {item.iconText}
              </Text>
            </Pressable>
          );
        }
      )}
    </HStack>
  );
}

const Layout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible
  );

  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden">
        <MobileHeader title={props.title} />
      </Box>
      <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {isSidebarVisible && <Sidebar />}
          </Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default function DashboardLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <VStack className="h-full w-full items-center justify-center">
        <Text>Loading...</Text>
      </VStack>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="h-full w-full">
      <Layout title="FCS" isSidebarVisible={true}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="feed" />
          <Stack.Screen name="profile" />
        </Stack>
      </Layout>
      <MobileFooter footerIcons={bottomTabsList} />
    </SafeAreaView>
  );
}
