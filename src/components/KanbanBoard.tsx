import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from '@/components/ui/scroll-area';
import KanbanCard from '@/components/KanbanCard'; // Assuming this component exists
import { toast } from "sonner";

// Define the structure for an RFP item
type RFPItem = {
  id: string;
  title: string;
  clientName: string;
  value: number;
  dueDate: string;
};

// Define the possible column statuses
type ColumnId = 'new' | 'in-progress' | 'submitted' | 'won';

const initialColumns: Record<ColumnId, { title: string; items: RFPItem[] }> = {
  'new': {
    title: 'New',
    items: [
      { id: 'rfp-1', title: 'Project Alpha', clientName: 'Innovate Inc.', value: 150000, dueDate: '2024-08-15' },
      { id: 'rfp-2', title: 'Project Beta', clientName: 'Solutions Corp.', value: 220000, dueDate: '2024-08-20' },
    ],
  },
  'in-progress': {
    title: 'In Progress',
    items: [
      { id: 'rfp-3', title: 'Project Gamma', clientName: 'Synergy LLC', value: 95000, dueDate: '2024-08-10' },
    ],
  },
  'submitted': {
    title: 'Submitted',
    items: [
      { id: 'rfp-4', title: 'Project Delta', clientName: 'Future Systems', value: 310000, dueDate: '2024-07-30' },
    ],
  },
  'won': {
    title: 'Won',
    items: [
      { id: 'rfp-5', title: 'Project Epsilon', clientName: 'Global Tech', value: 500000, dueDate: '2024-07-01' },
    ],
  },
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  console.log('KanbanBoard loaded');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: RFPItem, sourceColumnId: ColumnId) => {
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: ColumnId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId') as ColumnId;

    if (!itemId || !sourceColumnId || sourceColumnId === targetColumnId) {
      return;
    }

    let draggedItem: RFPItem | undefined;
    const newColumns = { ...columns };

    // Find and remove the item from the source column
    const sourceItems = [...newColumns[sourceColumnId].items];
    const itemIndex = sourceItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      [draggedItem] = sourceItems.splice(itemIndex, 1);
      newColumns[sourceColumnId] = { ...newColumns[sourceColumnId], items: sourceItems };
    }

    // Add the item to the target column
    if (draggedItem) {
      const targetItems = [...newColumns[targetColumnId].items];
      targetItems.push(draggedItem);
      newColumns[targetColumnId] = { ...newColumns[targetColumnId], items: targetItems };

      setColumns(newColumns);
      toast.success(`RFP "${draggedItem.title}" moved to ${newColumns[targetColumnId].title}.`);
    }
  };

  return (
    <div className="flex gap-6 p-4 overflow-x-auto">
      {(Object.keys(columns) as ColumnId[]).map((columnId) => {
        const column = columns[columnId];
        return (
          <div
            key={columnId}
            className="w-80 flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <Card className="bg-slate-50/50 dark:bg-slate-900/50 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{column.title}</span>
                  <Badge variant="secondary">{column.items.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-2">
                <ScrollArea className="h-full max-h-[calc(100vh-250px)] pr-3">
                  <div className="space-y-4">
                    {column.items.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, columnId)}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <KanbanCard rfp={item} />
                      </div>
                    ))}
                    {column.items.length === 0 && (
                      <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md text-slate-400">
                        <p>Drop cards here</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;