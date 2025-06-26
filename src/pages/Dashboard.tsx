import React from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import AnimatedChartWrapper from '@/components/AnimatedChartWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, DollarSign, Target, Clock } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

// Placeholder data for the charts
const pipelineData = [
  { name: 'Discovery', value: 8 },
  { name: 'Proposal', value: 12 },
  { name: 'Negotiation', value: 5 },
  { name: 'Closed', value: 3 },
];

const winLossData = [
  { month: 'Jan', won: 4, lost: 1 },
  { month: 'Feb', won: 3, lost: 2 },
  { month: 'Mar', won: 5, lost: 1 },
  { month: 'Apr', won: 6, lost: 3 },
  { month: 'May', won: 8, lost: 2 },
];

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
            <MetricCard
              title="Active RFPs"
              value="28"
              trendValue="+3 this week"
              trendDirection="up"
              icon={Briefcase}
              linkTo="/r-f-p-management" // Path from App.tsx
            />
            <MetricCard
              title="Total Pipeline Value"
              value="$2.8M"
              trendValue="+12%"
              trendDirection="up"
              icon={DollarSign}
              linkTo="/analytics" // Path from App.tsx
            />
            <MetricCard
              title="Win Rate"
              value="62%"
              trendValue="-2%"
              trendDirection="down"
              icon={Target}
              linkTo="/analytics" // Path from App.tsx
            />
            <MetricCard
              title="Upcoming Deadlines"
              value="4"
              trendValue="2 due this week"
              trendDirection="down"
              icon={Clock}
              linkTo="/r-f-p-management" // Path from App.tsx
            />
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <AnimatedChartWrapper>
              <Card>
                <CardHeader>
                  <CardTitle>RFP Pipeline Stages</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pipelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          borderColor: 'hsl(var(--border))' 
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill="hsl(var(--primary))" name="RFPs in Stage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </AnimatedChartWrapper>
            
            <AnimatedChartWrapper delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Win/Loss Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={winLossData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          borderColor: 'hsl(var(--border))' 
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="won" stroke="#16a34a" name="Won" strokeWidth={2} />
                      <Line type="monotone" dataKey="lost" stroke="#dc2626" name="Lost" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </AnimatedChartWrapper>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;