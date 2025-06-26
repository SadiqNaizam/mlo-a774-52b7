import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { StepBack, StepForward, Check, Rocket } from 'lucide-react';

// Define the shape of a single step
export interface Step {
  title: string;
  content: React.ReactNode;
}

// Define the props for the wizard component
interface MultiStepWizardProps {
  steps: Step[];
  onFinish: () => void;
  wizardTitle?: string;
  wizardDescription?: string;
}

const MultiStepWizard: React.FC<MultiStepWizardProps> = ({
  steps,
  onFinish,
  wizardTitle = 'Multi-Step Process',
  wizardDescription = 'Please complete all steps to continue.',
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  console.log('MultiStepWizard loaded, current step:', currentStep + 1);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Wizard submitted!');
    onFinish();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{wizardTitle}</CardTitle>
        <CardDescription>{wizardDescription}</CardDescription>
        <div className="pt-4">
          <Breadcrumb>
            <BreadcrumbList>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {currentStep === index ? (
                      <BreadcrumbPage className="font-semibold text-primary">{step.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        onClick={() => {
                          // Allow jumping back to previous, completed steps
                          if (index < currentStep) {
                            setCurrentStep(index);
                          }
                        }}
                        className={index < currentStep ? 'cursor-pointer hover:text-primary' : 'text-muted-foreground'}
                      >
                        {step.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < totalSteps - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </CardHeader>
      <CardContent className="min-h-[250px] py-6">
        {steps[currentStep].content}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div>
          {!isFirstStep && (
            <Button variant="outline" onClick={prevStep}>
              <StepBack className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {!isLastStep && (
            <Button onClick={nextStep}>
              Next
              <StepForward className="ml-2 h-4 w-4" />
            </Button>
          )}
          {isLastStep && (
            <Button onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Submit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultiStepWizard;