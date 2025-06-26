import React, { useState } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';

// Custom Components
import MultiStepWizard, { Step } from '@/components/MultiStepWizard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "sonner";

// Define the shape of our RFP data
interface RFPFormData {
  rfpTitle: string;
  client: string;
  dueDate: string;
  scope: string;
  requirements: string;
  submissionNotes: string;
}

const RFPDetailCreationPage = () => {
  console.log('RFPDetailCreationPage loaded');

  const [formData, setFormData] = useState<RFPFormData>({
    rfpTitle: '',
    client: '',
    dueDate: '',
    scope: '',
    requirements: '',
    submissionNotes: '',
  });

  const handleInputChange = (field: keyof RFPFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onWizardFinish = () => {
    console.log('Final RFP Data:', formData);
    toast.success("RFP has been successfully created!", {
      description: `Title: ${formData.rfpTitle}`,
    });
    // Here you would typically send the data to a server
  };

  const steps: Step[] = [
    {
      title: 'Basic Information',
      content: (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="rfp-title">RFP Title</Label>
            <Input
              id="rfp-title"
              placeholder="e.g., New Website Development"
              value={formData.rfpTitle}
              onChange={(e) => handleInputChange('rfpTitle', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <Select onValueChange={(value) => handleInputChange('client', value)} value={formData.client}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="innovate-corp">Innovate Corp</SelectItem>
                  <SelectItem value="quantum-solutions">Quantum Solutions</SelectItem>
                  <SelectItem value="summit-enterprises">Summit Enterprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Scope & Requirements',
      content: (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="scope">Project Scope</Label>
            <Textarea
              id="scope"
              placeholder="Provide a high-level overview of the project scope..."
              className="min-h-[100px]"
              value={formData.scope}
              onChange={(e) => handleInputChange('scope', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="requirements">Key Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List the key technical and business requirements..."
              className="min-h-[100px]"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Submission Details',
      content: (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Attachments</Label>
             <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, DOCX, or PPTX (MAX. 10MB)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
          </div>
          <div className="grid gap-2">
            <Label htmlFor="submission-notes">Submission Notes</Label>
            <Textarea
              id="submission-notes"
              placeholder="Add any final notes about the submission process..."
              value={formData.submissionNotes}
              onChange={(e) => handleInputChange('submissionNotes', e.target.value)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="py-8">
            <MultiStepWizard
              steps={steps}
              onFinish={onWizardFinish}
              wizardTitle="Create New RFP"
              wizardDescription="Fill out the details below to add a new Request for Proposal to the system."
            />
          </div>
        </main>
        {/* Footer could go here if needed inside the scrollable area, or outside if fixed */}
      </div>
       {/* A fixed footer can be placed here if desired */}
    </div>
  );
};

export default RFPDetailCreationPage;