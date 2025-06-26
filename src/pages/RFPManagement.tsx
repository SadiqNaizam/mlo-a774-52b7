import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import KanbanBoard from '@/components/KanbanBoard';
import MultiStepWizard, { Step } from '@/components/MultiStepWizard';
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";

// Define content for the wizard steps
const RFPWizardSteps: Step[] = [
  {
    title: 'Basic Information',
    content: (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rfp-title" className="text-right">
            RFP Title
          </Label>
          <Input id="rfp-title" placeholder="e.g., Q3 Enterprise Software Upgrade" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="client-name" className="text-right">
            Client Name
          </Label>
          <Input id="client-name" placeholder="e.g., Globex Corporation" className="col-span-3" />
        </div>
      </div>
    ),
  },
  {
    title: 'Scope & Value',
    content: (
       <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rfp-value" className="text-right">
            Estimated Value ($)
          </Label>
          <Input id="rfp-value" type="number" placeholder="e.g., 150000" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="rfp-scope" className="text-right pt-2">
            Scope
          </Label>
          <Textarea id="rfp-scope" placeholder="Briefly describe the project scope..." className="col-span-3 min-h-[100px]" />
        </div>
      </div>
    ),
  },
  {
    title: 'Review & Submit',
    content: (
      <div className="space-y-4 py-4 text-sm">
        <p>You are about to create a new RFP with the provided details.</p>
        <p className="font-semibold">Please review all information in the previous steps before submitting.</p>
        <p className="text-muted-foreground">Clicking 'Submit' will add the new RFP to the 'New' column on the board.</p>
      </div>
    ),
  },
];


const RFPManagementPage = () => {
  console.log('RFPManagementPage loaded');
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const handleWizardFinish = () => {
    setCreateDialogOpen(false);
    toast.success("New RFP has been successfully created!");
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-2xl">RFP Pipeline</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create RFP
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl">
                  <MultiStepWizard
                    steps={RFPWizardSteps}
                    onFinish={handleWizardFinish}
                    wizardTitle="Create New RFP"
                    wizardDescription="Follow the steps to add a new Request for Proposal to the pipeline."
                  />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1 -m-4 md:-m-6">
             <KanbanBoard />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RFPManagementPage;