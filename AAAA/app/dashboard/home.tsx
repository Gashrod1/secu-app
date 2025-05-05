import {Box} from "@/components/ui/box";
import {HStack} from "@/components/ui/hstack";
import {isWeb} from "@gluestack-ui/nativewind-utils/IsWeb";
import {Icon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {Button, ButtonText} from "@/components/ui/button";
import React from "react";
import { useRouter } from "expo-router";
import {Heading} from "@/components/ui/heading";
import {ScrollView} from "@/components/ui/scroll-view";
import {Divider} from "@/components/ui/divider";
import {Grid, GridItem} from "@/components/ui/grid";
import {Avatar, AvatarImage,} from "@/components/ui/avatar";
import {CalendarIcon} from "@/assets/dashboard/icons/calendar";
import {cn} from "@gluestack-ui/nativewind-utils/cn";
import { useSession } from "@/components/ctx";


interface CardData {
  bannerUri: string;
  title: string;
  description: string;
}

interface HolidaysCardData {
  icon: any;
  title: string;
  description: string;
}

interface LeavesCardData {
  title: string;
  description: string;
  leaves: number;
  isDisabled: boolean;
}

interface ColleaguesCardData {
  image: any;
  title: string;
  position: string;
}

const HeadingCards: CardData[] = [
  {
    bannerUri: require("@/assets/dashboard/image.png"),
    title: "Update your profile",
    description: "Add your details",
  },
  {
    bannerUri: require("@/assets/dashboard/image2.png"),
    title: "Your skills",
    description: "Add your skills here",
  },
  {
    bannerUri: require("@/assets/dashboard/image3.png"),
    title: "Your goals",
    description: "Set a target to accomplish",
  },
  {
    bannerUri: require("@/assets/dashboard/image3.png"),
    title: "Your goals",
    description: "Set a target to accomplish",
  },
  {
    bannerUri: require("@/assets/dashboard/image3.png"),
    title: "Your goals",
    description: "Set a target to accomplish",
  },
];
const HolidaysCards: HolidaysCardData[] = [
  {
    icon: CalendarIcon,
    title: "Navaratri",
    description: "12 March, Monday (Optional holiday)",
  },
  {
    icon: CalendarIcon,
    title: "Durga Puja",
    description: "12 October, Tuesday",
  },
  {
    icon: CalendarIcon,
    title: "Diwali",
    description: "12 March, Wednesday",
  },
  {
    icon: CalendarIcon,
    title: "Christmas",
    description: "12 March, Thursday",
  },
];
const LeavesCards: LeavesCardData[] = [
  {
    title: "Earned Leaves",
    description: "Available 24",
    leaves: 24,
    isDisabled: false,
  },
  {
    title: "Sick Leaves",
    description: "Available 24",
    leaves: 24,
    isDisabled: false,
  },
  {
    title: "Menstrual Leaves",
    description: "Available 20",
    leaves: 20,
    isDisabled: false,
  },
  {
    title: "Optional Leaves",
    description: "Available 0",
    leaves: 0,
    isDisabled: true,
  },
];
const ColleaguesCards: ColleaguesCardData[] = [
  {
    image: require("@/assets/dashboard/image7.png"),
    title: "Emily Zho",
    position: "UI/UX Designer",
  },
  {
    image: require("@/assets/dashboard/image4.png"),
    title: "Marilyn Monroe",
    position: "SDE II",
  },
  {
    image: require("@/assets/dashboard/image5.png"),
    title: "James Kant",
    position: "SDE III",
  },
  {
    image: require("@/assets/dashboard/image6.png"),
    title: "Richard Faynmen",
    position: "CEO Marketing",
  },
];

export default function Home() {
  const { session } = useSession();
  const router = useRouter();

  console.log(session);
  return (
    <Box className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}
        className="flex-1 mb-20 md:mb-2"
      >
        <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
          <Heading size="2xl" className="font-roboto">
            Welcome {session?.firstName}
          </Heading>

          <Grid className="gap-5" _extra={{className: ""}}>
            {HeadingCards.map((item, index) => {
              return (
                <GridItem
                  _extra={{
                    className: "col-span-12 sm:col-span-6 lg:col-span-4",
                  }}
                  key={index}
                >
                  <HStack
                    space="md"
                    className="border border-border-300 rounded-lg p-4 items-center justify-between"
                  >
                    <HStack space="xl" className="items-center">
                      <Avatar>
                        <AvatarImage
                          height={100}
                          width={100}
                          //@ts-ignore
                          source={item.bannerUri}
                        />
                      </Avatar>
                      <VStack>
                        <Text className="font-semibold text-typography-900 line-clamp-1">
                          {item.title}
                        </Text>
                        <Text className="line-clamp-1">{item.description}</Text>
                      </VStack>
                    </HStack>
                    <Button size="xs">
                      <ButtonText>Edit</ButtonText>
                    </Button>
                  </HStack>
                </GridItem>
              );
            })}
          </Grid>

          <Box className="bg-background-50 p-4 rounded-md">
            <Text className="text-center font-medium">
              To view analytics you need client ID. Add it to your settings and
              you’re good to go.
            </Text>
          </Box>
          <Grid className="gap-5" _extra={{className: ""}}>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border border-border-300 rounded-lg px-4 py-6 items-center justify-between"
                space="sm"
              >
                <Box className="self-start  w-full px-4">
                  <Heading
                    size="lg"
                    className="font-roboto  text-typography-700"
                  >
                    Upcoming Holidays
                  </Heading>
                </Box>
                <Divider/>
                {HolidaysCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="w-full px-4 py-2">
                      <Avatar className="bg-background-50 h-10 w-10">
                        <Icon as={item.icon}/>
                      </Avatar>
                      <VStack>
                        <Text className="text-typography-900 font-roboto line-clamp-1">
                          {item.title}
                        </Text>
                        <Text className="text-sm font-roboto line-clamp-1">
                          {item.description}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border border-border-300 rounded-lg px-4 py-6 items-center justify-between"
                space="sm"
              >
                <Box className="self-start  w-full px-4">
                  <Heading
                    size="lg"
                    className="font-roboto  text-typography-700"
                  >
                    Your Leaves
                  </Heading>
                </Box>
                <Divider/>
                {LeavesCards.map((item, index) => {
                  return (
                    <HStack
                      space="lg"
                      key={index}
                      className="w-full px-4 py-2 justify-between items-center"
                    >
                      <HStack space="xl" className="items-center">
                        <Box
                          className={cn(
                            "rounded-full h-10 w-10 items-center justify-center",
                            {"bg-success-0": item.leaves !== 0},
                            {"bg-error-50": item.leaves === 0}
                          )}
                        >
                          <Text
                            className={cn(
                              {"text-success-800": item.leaves !== 0},
                              {"text-error-700": item.leaves === 0}
                            )}
                          >
                            {item.leaves}
                          </Text>
                        </Box>
                        <VStack>
                          <Text className="text-typography-900 font-roboto line-clamp-1">
                            {item.title}
                          </Text>
                          <Text className="text-sm font-roboto line-clamp-1">
                            {item.description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button
                        isDisabled={item.isDisabled}
                        variant="outline"
                        action="secondary"
                        size="xs"
                      >
                        <ButtonText>Apply</ButtonText>
                      </Button>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border border-border-300  rounded-lg px-4 py-6 items-center justify-between"
                space="sm"
              >
                <Box className="self-start  w-full px-4">
                  <Heading
                    size="lg"
                    className="font-roboto  text-typography-700"
                  >
                    New colleagues
                  </Heading>
                </Box>
                <Divider/>
                {ColleaguesCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="w-full px-4 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          height={100}
                          width={100}
                          source={item.image}
                        />
                      </Avatar>
                      <VStack>
                        <Text className="text-typography-900 font-roboto line-clamp-1">
                          {item.title}
                        </Text>
                        <Text className="text-sm font-roboto line-clamp-1">
                          {item.position}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border border-border-300 rounded-lg px-4 py-6 items-center justify-between"
                space="sm"
              >
                <Box className="self-start w-full px-4">
                  <Heading
                    size="lg"
                    className="font-roboto  text-typography-700"
                  >
                    New colleagues
                  </Heading>
                </Box>
                <Divider/>
                {ColleaguesCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="px-4 py-2 w-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          height={100}
                          width={100}
                          source={item.image}
                        />
                      </Avatar>
                      <VStack>
                        <Text className="text-typography-900 font-roboto line-clamp-1">
                          {item.title}
                        </Text>
                        <Text className="text-sm font-roboto line-clamp-1">
                          {item.position}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </ScrollView>
    </Box>
  );
};
