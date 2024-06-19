"use client"
import React from "react"
import {
  Stepper as ChakraStepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  VStack,
  useSteps,
  Text,
  useMediaQuery,
  Box
} from "@chakra-ui/react"

interface Step {
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  initialStep?: number
  width: string
}

function CustomStepNumber({ index }: any) {
  const formattedIndex = (index + 1).toString().padStart(2, "0")
  return <Box>{formattedIndex}</Box>
}

const Stepper: React.FC<StepperProps> = ({ steps, initialStep = 0, width }) => {
  const { activeStep } = useSteps({
    index: initialStep,
    count: steps.length
  })

  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

  return (
    <ChakraStepper
      colorScheme="green"
      size={isMobile ? "sm" : "md"}
      index={activeStep}
      width={width}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <VStack alignItems="center" justifyContent="center">
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={
                  <StepNumber
                    style={{
                      color: `${index === activeStep ? "#016748" : "#A8A29D"}`
                    }}
                  >
                    {`0${index + 1}`}
                  </StepNumber>
                }
                active={
                  <StepNumber
                    style={{
                      color: `${index === activeStep ? "#016748" : "#A8A29D"}`
                    }}
                  >
                    {" "}
                    {`0${index + 1}`}
                  </StepNumber>
                }
              />
            </StepIndicator>

            <VStack flexShrink="0" justifyContent="center">
              <StepTitle>
                <StepStatus
                  complete={
                    <Text fontSize={isMobile ? "10px" : "14px"} color="#016748">
                      {step.title}
                    </Text>
                  }
                  incomplete={
                    <Text
                      fontSize={isMobile ? "10px" : "14px"}
                      color={index === activeStep ? "#016748" : "#A8A29D"}
                    >
                      {step.title}
                    </Text>
                  }
                  active={
                    <Text
                      fontSize={isMobile ? "10px" : "14px"}
                      color={index === activeStep ? "#016748" : "#A8A29D"}
                    >
                      {step.title}
                    </Text>
                  }
                />
              </StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </VStack>
          </VStack>
          <StepSeparator style={{ marginTop: "-35px" }} />
        </Step>
      ))}
    </ChakraStepper>
  )
}

export default Stepper
