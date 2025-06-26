import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define a type for an optional icon component
type IconType = React.ElementType;

export interface MetricCardProps {
  title: string;
  value: string;
  trendValue: string;
  trendDirection: 'up' | 'down';
  icon?: IconType;
  linkTo: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trendValue,
  trendDirection,
  icon: Icon,
  linkTo,
}) => {
  console.log(`MetricCard loaded: ${title}`);

  const isTrendUp = trendDirection === 'up';

  return (
    <Link to={linkTo} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span
              className={cn(
                'flex items-center gap-1',
                isTrendUp ? 'text-green-600' : 'text-red-600'
              )}
            >
              {isTrendUp ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {trendValue}
            </span>
            <span className="ml-2">from last month</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MetricCard;