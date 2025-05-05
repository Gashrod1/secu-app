import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { DownloadIcon, SearchIcon } from "@/components/ui/icon";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Image } from "@/components/ui/image";
import React from "react";
import { useRouter } from "expo-router";

interface BlogData {
  bannerUri: string;
  title: string;
  description: string;
  publishedDate: string;
}

interface CreatorData {
  bannerUri: string;
  name: string;
  description: string;
}

const WORLD_DATA: BlogData[] = [
  {
    bannerUri: require("@/assets/feed/image3.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image4.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image5.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image3.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image4.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
];
const BLOGS_DATA: BlogData[] = [
  {
    bannerUri: require("@/assets/feed/image.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image2.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerUri: require("@/assets/feed/image2.png"),
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
];
const CREATORS_DATA: CreatorData[] = [
  {
    bannerUri: require("@/assets/feed/image6.png"),
    name: "Emily Zho",
    description: "Designer by heart, writer by profession, talks about design",
  },
  {
    bannerUri: require("@/assets/feed/image7.png"),
    name: "Ram Narayan",
    description: "Founder of Fortune 500 company Alo, talks about",
  },
  {
    bannerUri: require("@/assets/feed/image8.png"),
    name: "David John",
    description: "Creator of all things metal, talks about music and art. ",
  },
];

export default function Feed() {
  const router = useRouter();

  return (
    <VStack
      className="p-4 pb-0 md:px-10 md:pt-6 md:pb-0 h-full w-full max-w-[1500px] self-center  mb-20 md:mb-2"
      space="2xl"
    >
      <Input className="text-center md:hidden border-border-100">
        <InputField placeholder="Search" />
        <InputSlot className="pr-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
      </Input>
      <Heading size="2xl" className="font-roboto">
        What's new?
      </Heading>
      <HStack space="2xl" className="h-full w-full flex-1">
        <ScrollView
          className="max-w-[900px] flex-1 md:mb-2"
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack className="w-full" space="2xl">
            {BLOGS_DATA.map((item, index) => {
              return (
                <VStack
                  className="rounded-xl border border-border-300 p-5"
                  key={index}
                >
                  <Box className="w-full h-64 rounded">
                    <Image
                      className="object-cover h-full w-full"
                      height={100}
                      width={100}
                      source={item.bannerUri}
                      alt="an image"
                    />
                  </Box>
                  <VStack className="mt-4" space="md">
                    <Text className="text-sm">{item.publishedDate}</Text>
                    <Heading size="md">{item.title}</Heading>
                    <Text className="line-clamp-2">{item.description}</Text>
                  </VStack>
                </VStack>
              );
            })}
          </VStack>
        </ScrollView>
        <VStack className="max-w-[500px] hidden lg:flex" space="2xl">
          <Input className="text-center">
            <InputField placeholder="Search" />
            <InputSlot className="pr-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>
          <VStack>
            <ScrollView showsVerticalScrollIndicator={false} className="gap-7">
              <VStack space="lg">
                <Heading size="lg">From around the world</Heading>
                <VStack className="h-full" space="md">
                  {WORLD_DATA.map((item, index) => {
                    return (
                      <HStack
                        className="p-3 items-center h-full border border-border-300 rounded-xl"
                        space="lg"
                        key={index}
                      >
                        <Box className="relative h-full w-40 rounded">
                          <Image
                            className="object-cover h-full w-full"
                            height={100}
                            width={100}
                            source={item.bannerUri}
                            alt="an image"
                          />
                        </Box>
                        <VStack className="justify-between h-full" space="md">
                          <Text className="text-sm">{item.publishedDate}</Text>
                          <Heading size="md">{item.title}</Heading>
                          <Text className="line-clamp-2">
                            {item.description}
                          </Text>
                        </VStack>
                      </HStack>
                    );
                  })}
                </VStack>
              </VStack>
              <VStack space="lg" className="mt-7">
                <Heading size="lg">Find creators</Heading>
                <VStack className="h-full" space="md">
                  {CREATORS_DATA.map((item, index) => {
                    return (
                      <HStack
                        className="p-4 items-center h-full border border-border-300 rounded-xl"
                        space="lg"
                        key={index}
                      >
                        <Avatar>
                          <Avatar>
                            <AvatarFallbackText>
                              {item.name?.[0] ?? "U"}
                            </AvatarFallbackText>
                          </Avatar>
                        </Avatar>
                        <Button
                          variant="outline"
                          action="secondary"
                          className="p-2"
                        >
                          <ButtonIcon as={DownloadIcon} />
                        </Button>
                        <VStack>
                          <Text className="font-semibold text-typography-900">
                            {item.name}
                          </Text>
                          <Text className="line-clamp-1 text-sm">
                            {item.description}
                          </Text>
                        </VStack>
                        <Button action="secondary" variant="outline">
                          <ButtonText>Follow</ButtonText>
                        </Button>
                      </HStack>
                    );
                  })}
                </VStack>
              </VStack>
            </ScrollView>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
