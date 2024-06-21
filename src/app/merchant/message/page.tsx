"use client"
import { useEffect, useState } from "react"
import SendBird from "sendbird"
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  IconButton,
  useToast,
  Flex,
  InputGroup,
  InputLeftElement,
  Progress,
  Divider
} from "@chakra-ui/react"
import { AttachmentIcon } from "@chakra-ui/icons"
import Image from "next/image"
import CustomTitle from "@/components/Text"
import { IoIosAlert, IoIosArrowBack, IoIosSearch } from "react-icons/io"
import { FaExclamation } from "react-icons/fa6"
import { FieldType } from "@/types/form"
import { useForm } from "react-hook-form"
import ControlledField from "@/components/formHook/ControlledField"

const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string
const USER_ID = process.env.NEXT_PUBLIC_SENDBIRD_USER_ID as string
const defaultProfileUrl =
  "https://atech-capacitor.s3.ap-southeast-1.amazonaws.com/dev/c1d7c2f4-aaa3-4ff1-bb9d-6363a1556264%20-%20cropped-image"

const MessagePage: React.FC = () => {
  const [sb, setSb] = useState<SendBird.SendBirdInstance | null>(null)
  const [channels, setChannels] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")
  const [userProfile, setUserProfile] = useState<SendBird.User | null>(null)
  const [activeChannel, setActiveChannel] =
    useState<SendBird.GroupChannel | null>(null)
  const [messages, setMessages] = useState<any>([])
  const [selectedTypeChat, setSelectedTypeChat] = useState<string>("All")
  const [unreadMessages, setUnreadMessages] = useState(0)

  const toast = useToast()
  const form = useForm<any>()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  useEffect(() => {
    const sb = new SendBird({ appId: APP_ID })
    sb.connect(USER_ID, (user, error) => {
      if (error) {
        console.log(error)
        return
      }
      setSb(sb)
      setUserProfile(sb.currentUser)
      const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery()
      channelListQuery.next((channelList, error) => {
        if (error) {
          console.log(error)
          return
        }
        setChannels(channelList)
      })
    })
  }, [])

  useEffect(() => {
    if (sb) {
      channels.forEach((channel: any) => {
        channel.onMessageReceived = (channel: any, message: any) => {
          setUnreadMessages((prevCount) => prevCount + 1)
        }
      })
    }

    return () => {
      if (sb) {
        channels.forEach((channel) => {
          channel.onMessageReceived = null
        })
      }
    }
  }, [sb, channels])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast({
          title: "File too large",
          description: "File size must be less than 5MB.",
          status: "error",
          duration: 5000,
          isClosable: true
        })
      } else {
        // Handle file upload
        console.log(file)
        const channel = channels.find(
          (channel) => channel.url === activeChannel?.url
        )
        if (channel && sb) {
          const params = new sb.FileMessageParams()
          params.file = file
          params.fileName = file.name
          params.fileSize = file.size
          params.mimeType = file.type
          params.data = "Extra data"
          params.customType = "Custom type"

          channel.sendFileMessage(params, function (message: any, error: any) {
            if (error) {
              console.log(error)
              return
            }
            console.log("File sent")
            selectChannel(channel) // Memperbarui daftar pesan
          })
        }
      }
    }
    e.target.value = "" // Reset the input to allow selecting the same file
  }

  const sendMessage = (channelUrl: string) => {
    const channel = channels.find((channel) => channel.url === channelUrl)
    if (channel) {
      channel.sendUserMessage(
        message,
        "",
        "",
        function (message: any, error: any) {
          if (error) {
            console.log(error)
            return
          }
          console.log("Message sent")
          setMessage("") // Mengosongkan input
          selectChannel(channel) // Memperbarui daftar pesan
        }
      )
    }
  }

  const selectChannel = (channel: any) => {
    setActiveChannel(channel)
    const messageListQuery = channel.createPreviousMessageListQuery()
    messageListQuery.load(20, false, (messageList: any, error: any) => {
      if (error) {
        console.log(error)
        return
      }
      setMessages(messageList)
    })
  }

  const typeChat = ["All", "Buying", "Selling", "Unread", "Archived"]
  // ...rest of the code

  return (
    <Flex mx={{
      base: 4,
      md: '30vw',
      lg: '30vw'
    }}>
      <Flex direction={"column"} gap={4}>
        <HStack>
          <IoIosArrowBack />
          <Flex w={"full"} justifyContent={"center"}>
            <CustomTitle title="Messages" />
          </Flex>
        </HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoIosSearch />
          </InputLeftElement>
          <Input borderRadius={"xl"} placeholder="Search" />
        </InputGroup>
        <Flex maxW={"768px"} flexWrap={"wrap"} gap={2}>
          {typeChat.map((type, index) => (
            <Button
              borderWidth={1}
              backgroundColor={selectedTypeChat === type ? "#016748" : "white"}
              key={index}
              borderRadius={"xl"}
              color={selectedTypeChat === type ? "white" : "black"}
              onClick={() => setSelectedTypeChat(type)}
            >
              {type}
            </Button>
          ))}
        </Flex>
        <Flex p={4} borderWidth={1} borderRadius={"xl"}>
          <VStack alignItems={"start"}>
            <HStack>
              <Box borderRadius={"50%"} bgColor={"#F2B926"} p={1}>
                <FaExclamation size={20} color="white" />
              </Box>
              <Text color={"#44403C"} fontWeight={"600"}>
                Reaching Chatroom Quota
              </Text>
            </HStack>
            <Text color={"#78716C"}>
              You are reaching quota. You can still receive messages, but unable
              to view clients&apos; names and profile pictures.
            </Text>
            <HStack minW="100%" gap={4}>
              <Progress
                value={80}
                w={"80%"}
                colorScheme="gray"
                borderRadius={"md"}
              />
              <Text color={"#78716C"}>25/30 Used</Text>
            </HStack>
          </VStack>
        </Flex>
        {/* {userProfile?.profileUrl && (
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                            <Image src={userProfile.profileUrl || defaultProfileUrl} alt="Profile Picture" width={100} height={100} />
                        </div>
                    )} */}
        <VStack alignItems={"start"} gap={4}>
          {channels.map((channel, index) => {
            const flatColors = [
              "#1abc9c",
              "#2ecc71",
              "#3498db",
              "#9b59b6",
              "#34495e",
              "#f1c40f",
              "#e67e22",
              "#e74c3c",
              "#ecf0f1",
              "#95a5a6"
            ]
            return (
              <>
                <HStack
                  key={channel.url}
                  cursor={"pointer"}
                  justifyContent={"space-between"}
                  onClick={() => selectChannel(channel)}
                >
                  <HStack>
                    <Box
                      w="50px"
                      h="50px"
                      borderRadius={"full"}
                      backgroundColor={flatColors[index]}
                    />
                    <VStack pl={4} alignItems={"start"}>
                      <Text color={"#78716C"} fontSize={"11px"}>
                        Brand Name
                      </Text>
                      <Text>
                        {channel.lastMessage
                          ? channel.lastMessage?.message
                          : ""}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack alignItems={"end"}>
                    <Text>
                      {channel.lastMessage
                        ? new Date(
                            channel.lastMessage.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </Text>
                    <Box
                      w="30px"
                      h="30px"
                      borderRadius={"full"}
                      backgroundColor={"#016748"}
                    >
                      <Text color={"white"} textAlign="center" pt={1}>
                        {unreadMessages}
                      </Text>
                    </Box>
                  </VStack>
                  {/* <Heading as="h2">{channel.name}</Heading>
                            <Heading as="h3">Members</Heading>
                            {channel.members.map((member) => (
                                <>
                                    <Text key={member.userId}>Nickname: {member.nickname}</Text>
                                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                        <Image src={member.profileUrl || defaultProfileUrl} alt="Profile Picture" width={50} height={50} />
                                    </div>
                                </>
                            ))} */}
                </HStack>
                <Divider />
              </>
            )
          })}
        </VStack>
      </Flex>
      {/* <Box border={2} h={"full"}>
                    <Heading as="h2">Messages</Heading>
                    <Box maxHeight={'500px'} overflow={"auto"}>
                    {messages.map((message: any, index: number) => {
                        if (message.isFileMessage()) {
                            const fileMessage = message as SendBird.FileMessage;
                            if (fileMessage.type && fileMessage.type.startsWith('image/')) {
                                return (
                                    <a key={index} href={fileMessage.url} target="_blank" rel="noopener noreferrer">
                                        <img src={fileMessage.url} alt={fileMessage.name} style={{ maxWidth: '100%', height: 'auto' }} />
                                    </a>
                                );
                            } else {
                                return (
                                    <a key={index} href={fileMessage.url} download>
                                        {fileMessage.name}
                                    </a>
                                );
                            }
                        } else {
                            return (
                                <p key={index}>{message.message}</p>
                            );
                        }
                    })}
                    </Box>
                    <HStack>

                        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Box position="relative">
                            <Input cursor={"pointer"} type="file" onChange={handleFileChange} opacity="0" position="absolute" zIndex="1" />
                            <IconButton aria-label="Upload file" icon={<AttachmentIcon />} />
                        </Box>
                    </HStack>
                    <Button disabled={!message} onClick={() => sendMessage(activeChannel?.url as string)}>Send</Button>

                </Box> */}
    </Flex>
  )
}

export default MessagePage
