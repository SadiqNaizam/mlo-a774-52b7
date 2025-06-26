import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export type RFP = {
  id: string;
  title: string;
  clientName: string;
  value: number;
  dueDate: string;
  priority?: 'High' | 'Medium' | 'Low';
};

interface KanbanCardProps {
  rfp: RFP;
  onClick?: () => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ rfp, onClick }) => {
  console.log('KanbanCard loaded for:', rfp.title);

  const priorityBadgeVariant = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'default',
  } as const;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      whileTap={{ scale: 0.98, cursor: 'grabbing' }}
      className="mb-4 cursor-grab"
      onClick={onClick}
    >
      <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100 pr-2">
              {rfp.title}
            </CardTitle>
            {rfp.priority && (
              <Badge variant={priorityBadgeVariant[rfp.priority] || 'default'}>
                {rfp.priority}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
            <span>{rfp.clientName}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rfp.value)}</span>
          </div>
          <div className="flex items-center text-sm text-red-600 dark:text-red-400 font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Due: {rfp.dueDate}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KanbanCard;