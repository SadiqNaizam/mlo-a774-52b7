import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AnimatedChartWrapper from '@/components/AnimatedChartWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// --- Placeholder Data for Charts ---

const performanceData = [
  { month: 'Jan', submitted: 30, won: 18 },
  { month: 'Feb', submitted: 45, won: 25 },
  { month: 'Mar', submitted: 50, won: 35 },
  { month: 'Apr', submitted: 42, won: 30 },
  { month: 'May', submitted: 60, won: 48 },
  { month: 'Jun', submitted: 55, won: 40 },
];

const winLossData = [
  { name: 'Won', value: 196 },
  { name: 'Lost', value: 82 },
];
const COLORS = ['#16a34a', '#dc2626']; // Green for Won, Red for Lost

const lossReasonData = [
  { reason: 'Pricing', count: 35 },
  { reason: 'Timeline', count: 22 },
  { reason: 'Missing Features', count: 15 },
  { reason: 'Competitor', count: 10 },
];

const cycleTimeData = [
  { month: 'Jan', days: 25 },
  { month: 'Feb', days: 28 },
  { month: 'Mar', days: 22 },
  { month: 'Apr', days: 30 },
  { month: 'May', days: 26 },
  { month: 'Jun', days: 24 },
];


const Analytics = () => {
  console.log('Analytics page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Visual insights into RFP performance, win/loss rates, and process efficiency.
            </p>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="win-loss">Win/Loss Analysis</TabsTrigger>
                <TabsTrigger value="cycle-time">Cycle Time</TabsTrigger>
              </TabsList>
              <div className="w-full sm:w-auto min-w-[180px]">
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 90 Days</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="performance" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AnimatedChartWrapper>
                  <Card>
                    <CardHeader>
                      <CardTitle>RFP Submission & Win Trend</CardTitle>
                      <CardDescription>Monthly overview of submitted vs. won proposals.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="submitted" stroke="#8884d8" name="Submitted" />
                          <Line type="monotone" dataKey="won" stroke="#82ca9d" name="Won" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </AnimatedChartWrapper>
                {/* Add another performance chart here if needed */}
              </div>
            </TabsContent>

            <TabsContent value="win-loss" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <AnimatedChartWrapper className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Win/Loss Ratio</CardTitle>
                      <CardDescription>A summary of all proposal outcomes.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {winLossData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </AnimatedChartWrapper>
                <AnimatedChartWrapper className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Reasons for Lost RFPs</CardTitle>
                      <CardDescription>Analysis of why proposals did not succeed.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={lossReasonData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="reason" width={110} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#dc2626" name="Count" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </AnimatedChartWrapper>
              </div>
            </TabsContent>

            <TabsContent value="cycle-time" className="mt-6">
              <AnimatedChartWrapper>
                <Card>
                  <CardHeader>
                    <CardTitle>Average RFP Cycle Time</CardTitle>
                    <CardDescription>Average time (in days) from creation to decision.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cycleTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="days" stroke="#f97316" name="Average Days" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </AnimatedChartWrapper>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;