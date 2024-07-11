"use client"
import { useEffect, useRef, useState } from "react"
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
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  Center,
  useMediaQuery,
  background
} from "@chakra-ui/react"
import { AttachmentIcon } from "@chakra-ui/icons"
import Image from "next/image"
import CustomTitle from "@/components/Text"
import { IoIosAlert, IoIosArrowBack, IoIosSearch } from "react-icons/io"
import { FaExclamation } from "react-icons/fa6"
import { useForm } from "react-hook-form"
import { BiMessageRoundedDetail } from "react-icons/bi"
import useSidebarStore from "@/store/sidebarStore"

const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string
const USER_ID = process.env.NEXT_PUBLIC_SENDBIRD_USER_ID as string
const defaultProfileUrl =
  "https://atech-capacitor.s3.ap-southeast-1.amazonaws.com/dev/c1d7c2f4-aaa3-4ff1-bb9d-6363a1556264%20-%20cropped-image"

interface Message {
  id: string
  timestamp: number // Unix timestamp
  message?: string
  url?: string
  name?: string
  type?: string
  isFileMessage: () => boolean
}

type MessageType = "buying" | "selling" | "unread" | "archived"

const MessagePage: React.FC = () => {
  const { isExpanded, toggleSidebar } = useSidebarStore()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [sb, setSb] = useState<SendBird.SendBirdInstance | null>(null)
  const [channels, setChannels] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")
  const [userProfile, setUserProfile] = useState<SendBird.User | null>(null)
  const [activeChannel, setActiveChannel] =
    useState<SendBird.GroupChannel | null>(null)
  const [messages, setMessages] = useState<any>([])
  const [selectedTypeChat, setSelectedTypeChat] = useState<string>("All")
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [loadPreviousMessages, setLoadPreviousMessages] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      // Create a unique identifier for the handler
      const handlerId = new Date().getTime().toString()

      // Create a new ChannelHandler
      const channelHandler = new sb.ChannelHandler()

      // Define what happens when a new message is received
      channelHandler.onMessageReceived = (channel, message) => {
        if (activeChannel?.url === channel.url) {
          setMessages((prevMessages: any) => [...prevMessages, message])
        }
        setUnreadMessages((prevCount) => prevCount + 1)
      }

      // Register the ChannelHandler with the SendBird instance
      sb.addChannelHandler(handlerId, channelHandler)

      // Cleanup function to unregister the ChannelHandler
      return () => {
        sb.removeChannelHandler(handlerId)
      }
    }
  }, [sb, channels, activeChannel]) // Re-run this effect if `sb` changes

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
    const params: any = new sb!.UserMessageParams()
    params.message = message
    // params.customType = 'buying';
    // params.data = JSON.stringify({   // A pair of key-value
    //   'productName': 'Golden Kiwi',
    //   'totalProductPrice': 2143.80,
    //   'unitPrice': 23.82,
    //   'quantity': 90,
    //   'productImage':
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kiwifruit_%27Gold%27_cross_section.jpg/1200px-Kiwifruit_%27Gold%27_cross_section.jpg'
    // });
    if (channel) {
      channel.sendUserMessage(
        params,
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
          scrollToBottom()
        }
      )
    }
  }

  useEffect(() => {
    if (messagesEndRef.current && !loadPreviousMessages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChannel, messages, loadPreviousMessages])

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

  function groupMessagesByTime(messages: Message[]): Map<string, Message[]> {
    const groupedMessages = new Map<string, Message[]>()

    messages.forEach((message: any) => {
      const date = new Date(message.createdAt)
      const timeKey = date.toLocaleString("en-US", {
        day: "2-digit", // 2 digit day
        month: "2-digit", // 2 digit month
        hour: "2-digit", // 2 digit hour
        minute: "2-digit", // 2 digit minute
        hour12: true // Menggunakan format 12 jam dengan AM/PM
      })

      if (!groupedMessages.has(timeKey)) {
        groupedMessages.set(timeKey, [])
      }

      groupedMessages.get(timeKey)?.push(message)
    })

    return groupedMessages
  }

  const groupedMessages = groupMessagesByTime(messages)

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChannel && sb) {
      // Asumsikan activeChannel adalah ID atau instance dari saluran yang aktif
      // Dan sb.groupChannel.getChannel() adalah cara untuk mendapatkan instance saluran
      // Berikut adalah contoh menggunakan instance method
      const markMessagesAsRead = async () => {
        const channel = await sb.GroupChannel.getChannel(activeChannel.url)
        await channel.markAsRead() // Menandai semua pesan di saluran sebagai dibaca
      }

      markMessagesAsRead().catch(console.error)
    }
  }, [activeChannel, sb])

  // useEffect(() => {
  //   const handleScroll = async () => {
  //     // Check if scrolled to top
  //     if (messagesContainerRef.current?.scrollTop === 0) {
  //       // Assuming `sb` and `activeChannel` are available in your component's scope
  //       if (activeChannel && sb) {
  //         const channel = await sb.GroupChannel.getChannel(activeChannel.url);
  //         const messageListQuery = channel.createPreviousMessageListQuery();
  //         messageListQuery.limit = 20; // Number of messages to load
  //         messageListQuery.includeMetaArray = true;
  //         messageListQuery.reverse = false; // Load older messages
  //         if (messageListQuery.hasMore) {
  //           setLoadPreviousMessages(true);
  //           const containerBeforeLoad = messagesContainerRef.current.scrollHeight;
  //           const olderMessages = await messageListQuery.load();
  //           // Prepend older messages to the existing messages
  //           setMessages((prevMessages: any) => {
  //             let filter = olderMessages.filter(om => !prevMessages.some((m: any) => m.messageId === om.messageId))
  //             if (filter.length > 0) {
  //               return [...filter, ...prevMessages]
  //             } else {
  //               return [...prevMessages]
  //             }
  //           });
  //           const containerAfterLoad = messagesContainerRef.current.scrollHeight;
  //           // Adjust scroll position to maintain viewing position
  //           messagesContainerRef.current.scrollTop += containerAfterLoad - containerBeforeLoad;
  //           setLoadPreviousMessages(false);
  //         }
  //       }
  //     }
  //   };

  //   const messagesContainer = messagesContainerRef.current;
  //   messagesContainer?.addEventListener('scroll', handleScroll);

  //   return () => messagesContainer?.removeEventListener('scroll', handleScroll);
  // }, [activeChannel, sb]);

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }



  const RenderModal = () => {
    let messageStyle = {
      backgroundColor: "#F5F5F4", // Warna latar hijau muda khas WhatsApp untuk pesan keluar
      color: "black", // Warna teks
      padding: "12px 18px", // Padding di dalam balon pesan
      borderRadius: "10px", // Radius border untuk membuat sudut balon pesan membulat
      maxWidth: "60%", // Maksimal lebar pesan
      margin: "4px 0", // Margin antar pesan
      alignSelf: "flex-end", // Menyelaraskan pesan ke kanan
      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)" // Sedikit bayangan untuk kedalaman
    }

    return (
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"2xl"}>
          <ModalCloseButton />
          <ModalBody mt={10}>
            {/* Modal Body Content Here */}
            <VStack w={"full"}>
              <HStack w={"full"} alignItems={"flex-end"}>
                <Box
                  h={"40px"}
                  w={"40px"}
                  borderRadius={"full"}
                  bgColor={"black"}
                />
                <Flex style={messageStyle} alignItems="center">
                  <Image
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kiwifruit_%27Gold%27_cross_section.jpg/1200px-Kiwifruit_%27Gold%27_cross_section.jpg"
                    }
                    alt="Product Image"
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden"
                    }}
                  />
                  <VStack gap={0} alignItems="start" pl={4}>
                    <Text
                      color={"#44403C"}
                      fontSize={"14px"}
                      fontWeight={"600"}
                    >
                      {"Golden Kiwi"}
                    </Text>
                    <Text
                      color={"#016748"}
                      fontSize={"20px"}
                      fontWeight={"600"}
                    >
                      $2143.80
                    </Text>
                    <Text color={"#78716C"} fontSize={"14px"}>
                      Unit Price: {`$23.82 Qty: 90`}
                    </Text>
                  </VStack>
                </Flex>
              </HStack>
              <Box
                style={{
                  ...messageStyle,
                  backgroundColor: "#1B1917",
                  color: "white",
                  borderRadius: "50px"
                }}
              >
                <Text>Sure!</Text>
              </Box>
            </VStack>
            <VStack>
              <Text color={"#44403C"} fontSize={"16px"} fontWeight={"600"}>
                Unlock Chat
              </Text>
              <Text color={"#44403C"} maxW={"335px"} textAlign={"center"}>
                Unlock chat with your client by subscribing now! Start growing
                your business with Freshood today!
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              borderRadius={"16px"}
              bgColor={"#016748"}
              color={"white"}
              w="full"
            >
              Learn more
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  interface ChatBubbleProps {
    message: string
    direction: "incoming" | "outgoing"
  }

  const ChatBubble: React.FC<ChatBubbleProps> = ({ message, direction }) => {
    return (
      <Tooltip
        label={direction === "incoming" ? "Incoming" : "Outgoing"}
        placement={direction === "incoming" ? "right" : "left"}
        hasArrow
      >
        <Box
          bg={direction === "incoming" ? "blue.100" : "green.100"}
          p={3}
          borderRadius="lg"
          maxWidth="60%"
          ml={direction === "incoming" ? "0" : "auto"}
          mr={direction === "outgoing" ? "0" : "auto"}
          boxShadow="md"
        >
          {message}
        </Box>
      </Tooltip>
    )
  }

  if (activeChannel && isMobile) {
    return (
      <Flex
        gap={4}
        direction={"column"}
        mx={{
          base: 4,
          md: "200px",
          lg: "200px"
        }}
      >
        <Flex direction={"column"} gap={4}>
          <HStack width={"full"} justifyContent={"space-between"}>
            <IoIosArrowBack
              cursor={"pointer"}
              onClick={() => {
                setActiveChannel(null)
              }}
            />
            <Flex w={"full"} justifyContent={"center"}>
              <CustomTitle title="Messages" />
            </Flex>
          </HStack>
          <HStack width={"full"}>
            {/* <Image
              src={activeChannel?.members.find(
                (member: any) => member.userId !== USER_ID
              )?.plainProfileUrl || defaultProfileUrl}
              alt="Profile Picture"
              width={50}
              height={50}
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "50px",
                height: "50px"
              }}
            /> */}
            <Flex pl={4} justifyContent={"center"} w={"full"}>
              <Text color={"#1B1917"} fontWeight={"600"}>
                {
                  activeChannel?.members.find(
                    (member: any) => member.userId !== USER_ID
                  )?.nickname
                }
              </Text>
            </Flex>
          </HStack>
          <Flex
            direction={"column"}
            gap={2}
            minHeight={{
              base: "65vh",
              md: "70vh",
              lg: "70vh"
            }}
            maxHeight={{
              base: "65vh",
              md: "70vh",
              lg: "70vh"
            }}
            px={4}
            overflow={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none" // Untuk Chrome, Safari, dan Opera
              },
              "-ms-overflow-style": "none", // Untuk IE dan Edge
              scrollbarWidth: "none" // Untuk Firefox
            }}
          >
            {Array.from(groupedMessages.entries()).map(
              ([time, groupedMessages]) => (
                <Flex direction={"column"} key={time}>
                  <Flex justifyContent={"center"}>
                    <div style={{ marginBottom: "10px", fontSize: '11px' }}>
                      {time}
                    </div>
                  </Flex>
                  {groupedMessages.map((message: any, index: number) => {
                    const lastGroup: any =
                      groupedMessages[groupedMessages.length - 1]
                    const isLastMessage =
                      message.messageId === lastGroup.messageId
                    const isOutgoingMessage = message.sender.userId === USER_ID // Contoh: bandingkan userId dari pengirim dengan userId pengguna saat ini

                    // Style untuk pesan keluar (pesan yang Anda kirim)
                    const outgoingMessageStyle = {
                      backgroundColor: "#F5F5F4", // Warna latar hijau muda khas WhatsApp untuk pesan keluar
                      color: "black", // Warna teks
                      padding: "8px 12px", // Padding di dalam balon pesan
                      borderRadius: "10px", // Radius border untuk membuat sudut balon pesan membulat
                      maxWidth: "70%", // Maksimal lebar pesan
                      margin: "4px 0", // Margin antar pesan
                      alignSelf: "flex-end", // Menyelaraskan pesan ke kanan
                      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", // Sedikit bayangan untuk kedalaman
                      fontSize: "14px"
                    }

                    // Style untuk pesan masuk (pesan dari orang lain)
                    const incomingMessageStyle = {
                      backgroundColor: "#F5F5F4", // Warna latar putih untuk pesan masuk
                      color: "black", // Warna teks
                      padding: "8px 12px", // Padding di dalam balon pesan
                      borderRadius: "10px", // Radius border untuk membuat sudut balon pesan membulat
                      maxWidth: "60%", // Maksimal lebar pesan
                      margin: "4px 0", // Margin antar pesan
                      alignSelf: "flex-start", // Menyelaraskan pesan ke kiri
                      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", // Sedikit bayangan untuk kedalaman
                      fontSize: "14px",
                    }

                    const messageStyle: any = isOutgoingMessage
                      ? outgoingMessageStyle
                      : incomingMessageStyle
                    if (message.isFileMessage()) {
                      const fileMessage = message as SendBird.FileMessage
                      if (
                        fileMessage.type &&
                        fileMessage.type.startsWith("image/")
                      ) {
                        return (
                          <div
                            ref={isLastMessage ? messagesEndRef : null}
                            key={index}
                            style={messageStyle}
                          >
                            <a
                              href={fileMessage.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={fileMessage.url}
                                alt={fileMessage.name}
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </a>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            ref={isLastMessage ? messagesEndRef : null}
                            key={index}
                            style={messageStyle}
                          >
                            <a href={fileMessage.url} download>
                              {fileMessage.name}
                            </a>
                          </div>
                        )
                      }
                    } else {
                      if (message.customType === "buying" && message.data) {
                        const data = JSON.parse(message.data)
                        return (
                          <Flex
                            onClick={onOpen}
                            cursor={"pointer"}
                            ref={isLastMessage ? messagesEndRef : null}
                            key={index}
                            style={messageStyle}
                            alignItems="center"
                          >
                            <Image
                              src={data.productImage}
                              alt="Product Image"
                              width={100}
                              height={100}
                              style={{
                                borderRadius: "12px",
                                overflow: "hidden"
                              }}
                            />
                            <VStack gap={0} alignItems="start" pl={4}>
                              <Text
                                color={"#44403C"}
                                fontSize={"14px"}
                                fontWeight={"600"}
                              >
                                {data.productName}
                              </Text>
                              <Text
                                color={"#016748"}
                                fontSize={"20px"}
                                fontWeight={"600"}
                              >
                                {"$" + data.totalProductPrice}
                              </Text>
                              <Text color={"#78716C"} fontSize={"14px"}>
                                Unit Price:{" "}
                                {`$${data.unitPrice} Qty: ${data.quantity}`}
                              </Text>
                            </VStack>
                          </Flex>
                        )
                      }
                      return (
                        <p
                          ref={isLastMessage ? messagesEndRef : null}
                          key={index}
                          style={messageStyle}
                        >
                          {message.message}
                        </p>
                      )
                    }
                  })}
                </Flex>
              )
            )}
          </Flex>
        </Flex>
        <Divider />
        <HStack>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(activeChannel?.url as string)
                setMessage("") // Opsional: Bersihkan input setelah mengirim
              }
            }}
          />
          <Box position="relative">
            <Input
              cursor={"pointer"}
              type="file"
              onChange={handleFileChange}
              opacity="0"
              position="absolute"
              zIndex="1"
            />
            <IconButton aria-label="Upload file" icon={<AttachmentIcon />} />
          </Box>
        </HStack>
        <Button
          disabled={!message}
          onClick={() => sendMessage(activeChannel?.url as string)}
        >
          Send
        </Button>
        <RenderModal />
      </Flex>
    )
  }

  const RenderBanner = ({ status = 4 }: any) => {
    switch (status) {
      case 1:
        return (
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
                You are reaching quota. You can still receive messages, but
                unable to view clients&apos; names and profile pictures.
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
              <Text color={"#016748"}>Learn More</Text>
            </VStack>
          </Flex>
        )
      case 2:
        return (
          <Flex p={4} borderWidth={1} borderRadius={"xl"}>
            <VStack alignItems={"start"}>
              <HStack>
                <Box borderRadius={"50%"} bgColor={"#B91C1C"} p={1}>
                  <FaExclamation size={20} color="white" />
                </Box>
                <Text color={"#44403C"} fontWeight={"600"}>
                  Reaching Chatroom Quota
                </Text>
              </HStack>
              <Text color={"#78716C"}>
                You are reaching quota. You can still receive messages, but
                unable to view clients&apos; names and profile pictures.
              </Text>
              <HStack minW="100%" gap={4}>
                <Progress
                  value={100}
                  w={"80%"}
                  colorScheme="gray"
                  borderRadius={"md"}
                />
                <Text color={"#78716C"}>30/30 Used</Text>
              </HStack>
              <Text color={"#016748"}>Learn More</Text>
            </VStack>
          </Flex>
        )
      case 3:
        return (
          <Flex p={4} borderWidth={1} borderRadius={"xl"}>
            <VStack alignItems={"start"}>
              <HStack>
                <Box borderRadius={"50%"} bgColor={"#F2B926"} p={1}>
                  <FaExclamation size={20} color="white" />
                </Box>
                <Text color={"#44403C"} fontWeight={"600"}>
                  Subscribe Chatroom Quota
                </Text>
              </HStack>
              <Text color={"#78716C"}>
                You haven&apos;t subscribed _______ yet. You can still receive
                messages, but unable to view client&apos;s names and profile
                pictures.
              </Text>
              {/* <HStack minW="100%" gap={4}>
                <Progress
                  value={80}
                  w={"80%"}
                  colorScheme="gray"
                  borderRadius={"md"}
                />
                <Text color={"#78716C"}>25/30 Used</Text>
              </HStack> */}
              <Text color={"#016748"}>Learn More</Text>
            </VStack>
          </Flex>
        )
      case 4:
        return (
          <Flex p={4} borderWidth={1} borderRadius={"xl"}>
            <VStack alignItems={"start"}>
              <HStack>
                <Box borderRadius={"50%"} p={1}>
                  <BiMessageRoundedDetail size={25} color="#016748" />
                </Box>
                <Text color={"#44403C"} fontWeight={"600"}>
                  Subscribe Chatroom Quota
                </Text>
              </HStack>
              <Text color={"#78716C"}>
                Unlock chat with your client by subscribing now! Start growing
                your business with Freshood today!
              </Text>
              {/* <HStack minW="100%" gap={4}>
                <Progress
                  value={80}
                  w={"80%"}
                  colorScheme="gray"
                  borderRadius={"md"}
                />
                <Text color={"#78716C"}>25/30 Used</Text>
              </HStack> */}
              <Text color={"#016748"}>Learn More</Text>
            </VStack>
          </Flex>
        )
      default:
        return (
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
                You are reaching quota. You can still receive messages, but
                unable to view clients&apos; names and profile pictures.
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
              <Text color={"#016748"}>Learn More</Text>
            </VStack>
          </Flex>
        )
      // return (
      //   <Flex p={4} borderWidth={1} borderRadius={"xl"}>
      //         <VStack alignItems={"start"}>
      //           <HStack>
      //             <Box borderRadius={"50%"} bgColor={"#F2B926"} p={1}>
      //               <FaExclamation size={20} color="white" />
      //             </Box>
      //             <Text color={"#44403C"} fontWeight={"600"}>
      //               Reaching Chatroom Quota
      //             </Text>
      //           </HStack>
      //           <Text color={"#78716C"}>
      //             You are reaching quota. You can still receive messages, but unable
      //             to view clients&apos; names and profile pictures.
      //           </Text>
      //           <HStack minW="100%" gap={4}>
      //             <Progress
      //               value={80}
      //               w={"80%"}
      //               colorScheme="gray"
      //               borderRadius={"md"}
      //             />
      //             <Text color={"#78716C"}>25/30 Used</Text>
      //           </HStack>
      //           <Text color={"#016748"}>Learn More</Text>
      //         </VStack>
      //       </Flex>
      // )
    }
  }

  return (
    <Flex
      mx={{
        base: 4,
        md: 'auto',
        lg: 'auto'
      }}
      // backgroundColor={"blue"}
      direction={"column"}
    >
      <HStack>
        {/* <IoIosArrowBack /> */}
        <Flex w={"full"} justifyContent={"center"}>
          <CustomTitle title="Messages" />
        </Flex>
      </HStack>
      <Flex pt={4} mx={isMobile ? '0%' : isExpanded ? '15%' : '10%'} pl={isMobile ? '0px' : '60px'}>
        <Flex
          w={activeChannel && !isMobile ? "100%" : "100%"}
          direction={"column"}
          gap={4}
          pr={4}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoIosSearch />
            </InputLeftElement>
            <Input borderRadius={"xl"} placeholder="Search" />
          </InputGroup>
          <Flex flexWrap={"wrap"} gap={2}>
            {typeChat.map((type, index) => (
              <Button
                borderWidth={1}
                backgroundColor={
                  selectedTypeChat === type ? "#016748" : "white"
                }
                key={index}
                borderRadius={"xl"}
                color={selectedTypeChat === type ? "white" : "black"}
                onClick={() => setSelectedTypeChat(type)}
              >
                {type}
              </Button>
            ))}
          </Flex>
          <RenderBanner />
          {/* {userProfile?.profileUrl && (
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                            <Image src={userProfile.profileUrl || defaultProfileUrl} alt="Profile Picture" width={100} height={100} />
                        </div>
                    )} */}
          <VStack alignItems={"start"} gap={4}>
            {channels.map((channel, index) => {
              const user = channel.members.find(
                (member: any) => member.userId !== USER_ID
              )
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
                    width={"full"}
                  >
                    <HStack>
                      <Image
                        src={user?.plainProfileUrl || defaultProfileUrl}
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        // borderRadius={"50%"}
                        style={{
                          borderRadius: "50%",
                          overflow: "hidden",
                          width: "50px",
                          height: "50px"
                        }}
                      />
                      <VStack pl={4} alignItems={"start"}>
                        <Text color={"#78716C"} fontSize={"11px"}>
                          {
                            channel.members.find(
                              (member: any) => member.userId !== USER_ID
                            )?.nickname
                          }
                        </Text>
                        <Text fontSize={"14px"}>
                          {channel.lastMessage
                            ? channel.lastMessage?.message
                            : ""}
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack alignItems={"end"} justifyContent={"space-between"} height={"full"}>
                      <Text fontSize={"11px"} color={"#78716C"}>
                        {channel.lastMessage
                          ? new Date(
                            channel.lastMessage.createdAt
                          ).toLocaleDateString()
                          : ""}
                      </Text>
                      {channel?.unreadMessageCount &&
                        channel?.unreadMessageCount > 0 && (
                          <Flex
                            w="20px"
                            h="20px"
                            borderRadius={"full"}
                            backgroundColor={"#016748"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Text fontSize={"11px"} color={"white"} textAlign="center">
                              {channel?.unreadMessageCount}
                            </Text>
                          </Flex>
                        )}
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
        {activeChannel && (
          <Flex
            borderLeft={"1px"}
            display={activeChannel && !isMobile ? "block" : "none"}
            w={"100%"}
            gap={4}
            direction={"column"}
            px={{
              base: 4
              // md: '200px',
              // lg: '200px'
            }}
          >
            <Flex direction={"column"} gap={4}>
              {/* <HStack width={"full"} justifyContent={"space-between"}>
                <IoIosArrowBack cursor={"pointer"} onClick={() => {
                  setActiveChannel(null)
                }} />

              </HStack> */}
              <HStack width={"full"}>
                {/* <Image
                src={activeChannel?.members.find(
                  (member: any) => member.userId !== USER_ID
                )?.plainProfileUrl || defaultProfileUrl}
                alt="Profile Picture"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "50px",
                  height: "50px"
                }}
              /> */}
                <Flex pl={4} justifyContent={"center"} w={"full"}>
                  <Text color={"#1B1917"} fontWeight={"600"}>
                    {
                      activeChannel?.members.find(
                        (member: any) => member.userId !== USER_ID
                      )?.nickname
                    }
                  </Text>
                </Flex>
              </HStack>
              <Flex
                direction={"column"}
                gap={2}
                minHeight={{
                  base: "65vh",
                  md: "70vh",
                  lg: "70vh"
                }}
                maxHeight={{
                  base: "65vh",
                  md: "70vh",
                  lg: "70vh"
                }}
                px={4}
                overflow={"auto"}
                ref={messagesContainerRef}
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none" // Untuk Chrome, Safari, dan Opera
                  },
                  "-ms-overflow-style": "none", // Untuk IE dan Edge
                  scrollbarWidth: "none" // Untuk Firefox
                }}
              >
                {Array.from(groupedMessages.entries()).map(
                  ([time, groupedMessages]) => (
                    <Flex direction={"column"} key={time}>
                      <Flex justifyContent={"center"}>
                        <div
                          style={{ marginBottom: "10px", fontSize: '11px', color: '#44403C' }}
                        >
                          {time}
                        </div>
                      </Flex>
                      {groupedMessages.map((message: any, index: number) => {
                        const lastGroup: any =
                          groupedMessages[groupedMessages.length - 1]
                        const isLastMessage =
                          message.messageId === lastGroup.messageId
                        const isOutgoingMessage =
                          message.sender.userId === USER_ID // Contoh: bandingkan userId dari pengirim dengan userId pengguna saat ini

                        // Style untuk pesan keluar (pesan yang Anda kirim)
                        const outgoingMessageStyle = {
                          backgroundColor: "#F5F5F4", // Warna latar hijau muda khas WhatsApp untuk pesan keluar
                          color: "black", // Warna teks
                          padding: "8px 12px", // Padding di dalam balon pesan
                          borderRadius: "10px", // Radius border untuk membuat sudut balon pesan membulat
                          maxWidth: "70%", // Maksimal lebar pesan
                          margin: "4px 0", // Margin antar pesan
                          alignSelf: "flex-end", // Menyelaraskan pesan ke kanan
                          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", // Sedikit bayangan untuk kedalaman
                          fontSize: '14px'
                        }

                        // Style untuk pesan masuk (pesan dari orang lain)
                        const incomingMessageStyle = {
                          backgroundColor: "#F5F5F4", // Warna latar putih untuk pesan masuk
                          color: "black", // Warna teks
                          padding: "8px 12px", // Padding di dalam balon pesan
                          borderRadius: "10px", // Radius border untuk membuat sudut balon pesan membulat
                          maxWidth: "60%", // Maksimal lebar pesan
                          margin: "4px 0", // Margin antar pesan
                          alignSelf: "flex-start", // Menyelaraskan pesan ke kiri
                          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", // Sedikit bayangan untuk kedalaman
                          fontSize: '14px'
                        }

                        const messageStyle: any = isOutgoingMessage
                          ? outgoingMessageStyle
                          : incomingMessageStyle
                        if (message.isFileMessage()) {
                          const fileMessage = message as SendBird.FileMessage
                          if (
                            fileMessage.type &&
                            fileMessage.type.startsWith("image/")
                          ) {
                            return (
                              <div
                                ref={isLastMessage ? messagesEndRef : null}
                                key={index}
                                style={messageStyle}
                              >
                                <a
                                  href={fileMessage.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={fileMessage.url}
                                    alt={fileMessage.name}
                                    style={{ maxWidth: "100%", height: "auto" }}
                                  />
                                </a>
                              </div>
                            )
                          } else {
                            return (
                              <div
                                ref={isLastMessage ? messagesEndRef : null}
                                key={index}
                                style={messageStyle}
                              >
                                <a href={fileMessage.url} style={{
                                  textDecoration: 'underline',
                                }} download>
                                  {fileMessage.name}
                                </a>
                              </div>
                            )
                          }
                        } else {
                          if (message.customType === "buying" && message.data) {
                            const data = JSON.parse(message.data)
                            return (
                              <Flex
                                onClick={onOpen}
                                cursor={"pointer"}
                                ref={isLastMessage ? messagesEndRef : null}
                                key={index}
                                style={messageStyle}
                                alignItems="center"
                              >
                                <Image
                                  src={data.productImage}
                                  alt="Product Image"
                                  width={100}
                                  height={100}
                                  style={{
                                    borderRadius: "12px",
                                    overflow: "hidden"
                                  }}
                                />
                                <VStack gap={0} alignItems="start" pl={4}>
                                  <Text
                                    color={"#44403C"}
                                    fontSize={"14px"}
                                    fontWeight={"600"}
                                  >
                                    {data.productName}
                                  </Text>
                                  <Text
                                    color={"#016748"}
                                    fontSize={"20px"}
                                    fontWeight={"600"}
                                  >
                                    {"$" + data.totalProductPrice}
                                  </Text>
                                  <Text color={"#78716C"} fontSize={"14px"}>
                                    Unit Price:{" "}
                                    {`$${data.unitPrice} Qty: ${data.quantity}`}
                                  </Text>
                                </VStack>
                              </Flex>
                            )
                          }
                          return (
                            <p
                              ref={isLastMessage ? messagesEndRef : null}
                              key={index}
                              style={messageStyle}
                            >
                              {message.message}
                            </p>
                          )
                        }
                      })}
                    </Flex>
                  )
                )}
              </Flex>
            </Flex>
            <Divider my={4} ml={4} />
            <HStack ml={4} w={"full"}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage(activeChannel?.url as string)
                    setMessage("") // Opsional: Bersihkan input setelah mengirim
                  }
                }}
              />
              <Box position="relative">
                <Input
                  cursor={"pointer"}
                  type="file"
                  onChange={handleFileChange}
                  opacity="0"
                  position="absolute"
                  zIndex="1"
                />
                <IconButton
                  aria-label="Upload file"
                  icon={<AttachmentIcon />}
                />
              </Box>
            </HStack>
            <Button
              mt={2}
              ml={4}
              w={"full"}
              disabled={!message}
              onClick={() => sendMessage(activeChannel?.url as string)}
            >
              Send
            </Button>
            <RenderModal />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default MessagePage
