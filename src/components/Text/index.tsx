import { Box, Text, useTheme } from "@chakra-ui/react";

const CustomTitle = ({ title = 'Title' }) => {
    const theme = useTheme();
  return (
    <Box
      backgroundImage="url('/misc/rectangle-yellow.svg')"
      backgroundRepeat="no-repeat"
      backgroundPosition="center bottom"
      backgroundSize="auto 35px"
      px={3}
      pb={'1px'}
      display="inline-block"
      as="h1"
    >
      <Text color={'var(--Brand-Color-Green---500-default, #016748)'} fontSize="50px" lineHeight="45px" textAlign="center">
        {title.toUpperCase()}
      </Text>
    </Box>
  );
};

export default CustomTitle;