'use client'
import { useEffect, useState } from 'react';
import SendBird from 'sendbird';
import { Box, Button, HStack, Heading, Input, Text, VStack, IconButton, useToast } from '@chakra-ui/react';
import { AttachmentIcon } from "@chakra-ui/icons";
import Image from 'next/image';

const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string;
const USER_ID = process.env.NEXT_PUBLIC_SENDBIRD_USER_ID as string;
const defaultProfileUrl = 'https://atech-capacitor.s3.ap-southeast-1.amazonaws.com/dev/c1d7c2f4-aaa3-4ff1-bb9d-6363a1556264%20-%20cropped-image';


const MessagePage: React.FC = () => {
    const [sb, setSb] = useState<SendBird.SendBirdInstance | null>(null);
    const [channels, setChannels] = useState<SendBird.GroupChannel[]>([]);
    const [message, setMessage] = useState<string>('');
    const [userProfile, setUserProfile] = useState<SendBird.User | null>(null);
    const [activeChannel, setActiveChannel] = useState<SendBird.GroupChannel | null>(null);
    const [messages, setMessages] = useState<any>([]);
    const toast = useToast();

    useEffect(() => {
        const sb = new SendBird({ appId: APP_ID });
        sb.connect(USER_ID, (user, error) => {
            if (error) {
                console.log(error);
                return;
            }
            setSb(sb);
            setUserProfile(sb.currentUser);
            const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
            channelListQuery.next((channelList, error) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setChannels(channelList);
            });
        });
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                toast({
                    title: "File too large",
                    description: "File size must be less than 5MB.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                // Handle file upload
                console.log(file);
                const channel = channels.find((channel) => channel.url === activeChannel?.url);
                if (channel && sb) {
                    const params = new sb.FileMessageParams();
                    params.file = file;
                    params.fileName = file.name;
                    params.fileSize = file.size;
                    params.mimeType = file.type;
                    params.data = "Extra data";
                    params.customType = "Custom type";

                    channel.sendFileMessage(params, function (message, error) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        console.log('File sent');
                        selectChannel(channel); // Memperbarui daftar pesan
                    });
                }
            }
        }
        e.target.value = ''; // Reset the input to allow selecting the same file
    };

    const sendMessage = (channelUrl: string) => {
        const channel = channels.find((channel) => channel.url === channelUrl);
        if (channel) {
            channel.sendUserMessage(message, '', '', function (message, error) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log('Message sent');
                setMessage(''); // Mengosongkan input
                selectChannel(channel); // Memperbarui daftar pesan
            });
        }
    };

    const selectChannel = (channel: SendBird.GroupChannel) => {
        setActiveChannel(channel);
        const messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(20, false, (messageList: any, error: any) => {
            if (error) {
                console.log(error);
                return;
            }
            setMessages(messageList);
        });
    };

    // ...rest of the code

    return (
        <Box>
            <HStack>
                <Box>
                    <Heading as="h1">Message</Heading>
                    <Heading as="h2">User Profile</Heading>
                    <Text>Nickname: {userProfile?.nickname}</Text>
                    {userProfile?.profileUrl && (
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                            <Image src={userProfile.profileUrl || defaultProfileUrl} alt="Profile Picture" width={100} height={100} />
                        </div>
                    )}
                    {channels.map((channel) => (
                        <Box key={channel.url} cursor={"pointer"} onClick={() => selectChannel(channel)}>
                            <Heading as="h2">{channel.name}</Heading>
                            <Heading as="h3">Members</Heading>
                            {channel.members.map((member) => (
                                <>
                                    <Text key={member.userId}>Nickname: {member.nickname}</Text>
                                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                        <Image src={member.profileUrl || defaultProfileUrl} alt="Profile Picture" width={50} height={50} />
                                    </div>
                                </>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box border={2} h={"full"}>
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

                </Box>
            </HStack>
        </Box>
    );
};

export default MessagePage;